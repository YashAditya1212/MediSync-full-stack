from flask import request, Response, Flask, jsonify, session, send_from_directory
from flask_cors import CORS
from blueprints.auth.auth import auth_bp
from blueprints.accident.accident import accident_bp
from blueprints.public.public import public_bp, HAS_AI_LIBS
from blueprints.emails.emails import emails
from extensions import mail

# AUTH AND MONGODB
from bson import ObjectId
from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import datetime
import os
import logging
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
)
logger = logging.getLogger(__name__)

# Log Mock AI Mode Warning
if not HAS_AI_LIBS:
    logger.warning("⚠️  Running in MOCK AI mode. Heavy dependencies (opencv, ultralytics) are missing or disabled.")

# MongoDB connection with error handling
db_connected = False
try:
    mongodb_uri = os.getenv('MONGODB_URI') or os.getenv('MONGO_URI')
    if not mongodb_uri:
        logger.error("MONGODB_URI is not configured.")
        raise ValueError("MONGODB_URI is not configured.")
    client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)
    # Test the connection
    client.server_info()
    mongo_db = client.flask_database
    db_connected = True
    logger.info("✅ MongoDB connection successful")
except Exception as e:
    logger.error(f"❌ MongoDB connection failed: {e}")
    print("⚠️  Please verify the database URI and database availability.")
    raise

# CLOUDINARY
import cloudinary
import cloudinary.api

app = Flask(__name__, static_folder='static')
app.config['UPLOAD_FOLDER'] = 'static/videos'

# CORS Configuration with strict origins from env
allowed_origins = [
    os.getenv('FRONTEND_URL'),
    os.getenv('GODSEYE_DASHBOARD_URL'),
]
# Add any extra origins from CORS_ORIGINS env
if os.getenv('CORS_ORIGINS'):
    allowed_origins.extend([o.strip() for o in os.getenv('CORS_ORIGINS').split(',') if o.strip()])

# Filter out None and provide a default for development
allowed_origins = [o for o in allowed_origins if o]
if not allowed_origins:
    allowed_origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"]

CORS(app, origins=allowed_origins, supports_credentials=True)

# Health Check Routes
@app.route('/')
@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy" if db_connected else "degraded",
        "service": "God's Eye AI API",
        "version": "1.0.0",
        "ai_enabled": HAS_AI_LIBS,
        "database_connected": db_connected,
        "timestamp": datetime.datetime.now().isoformat(),
        "uptime": "Service is running"
    }), 200

# Create upload directory if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Flask Secret Key (required for sessions)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')

# JWT... 
jwt = JWTManager(app)
jwt_secret = os.getenv('JWT_SECRET_KEY')
if not jwt_secret:
    logger.error("JWT_SECRET_KEY environment variable is required.")
    raise ValueError("JWT_SECRET_KEY environment variable is required. Please set it in your .env file.")
app.config['JWT_SECRET_KEY'] = jwt_secret
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

# MAIL...
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail.init_app(app)

# Validate required environment variables
required_env_vars = ['EMAIL', 'PASSWORD', 'CLOUD_NAME', 'API_KEY', 'API_SECRET', 'SENDTO']
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    logger.warning(f"⚠️  Missing environment variables: {', '.join(missing_vars)}")
else:
    def _mask_email(e: str) -> str:
        if not e or '@' not in e:
            return '***'
        name, domain = e.split('@', 1)
        name_mask = (name[0] + "***") if name else "***"
        domain_parts = domain.split('.')
        domain_mask = domain_parts[0][:1] + "***." + ".".join(domain_parts[1:]) if len(domain_parts) > 1 else "***"
        return f"{name_mask}@{domain_mask}"

    sender = os.getenv('EMAIL', '')
    recipient = os.getenv('SENDTO', '')
    logger.info(f"📧 Mail configured | FROM: {_mask_email(sender)} → TO: {_mask_email(recipient)}")

# ALL BLUEPRINTS...
app.register_blueprint(auth_bp)
app.register_blueprint(accident_bp)
app.register_blueprint(public_bp)
app.register_blueprint(emails)

accidents_collection = mongo_db.accidents
users_collection = mongo_db.users

# Global Error Handler for Flask
@app.errorhandler(Exception)
def handle_exception(e):
    logger.error(f"Unhandled Exception: {str(e)}", exc_info=True)
    return jsonify({
        "status": "error",
        "message": "An internal server error occurred"
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    logger.info(f"Starting server on port {port}")
    app.run(host="0.0.0.0", port=port)
