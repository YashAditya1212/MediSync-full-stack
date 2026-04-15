import hashlib
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from bson import ObjectId
from flask_jwt_extended import create_access_token
from pymongo import MongoClient

import os
from dotenv import load_dotenv
load_dotenv()

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

# MongoDB connection using environment variable
mongodb_uri = os.getenv('MONGODB_URI') or os.getenv('MONGO_URI') or "mongodb://localhost:27017"
client = MongoClient(mongodb_uri)
mongo_db = client.flask_database

# COLLECTION FOR THE USERS AND ACCIDENT...
accidents_collection = mongo_db.accidents
users_collection = mongo_db.users

# Route for the user to login...
@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
# Line 19-30 - Replace the login function with:
def login():
    login_details = request.get_json()
    
    # Check if request has required fields
    if not login_details or 'username' not in login_details or 'password' not in login_details:
        return jsonify({'msg': 'Username and password are required'}), 400
    
    user_from_db = users_collection.find_one({'username': login_details['username']})
    if user_from_db:
        print("🔥")
        encrypted_password = hashlib.sha256(login_details['password'].encode('utf-8')).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['username'])
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({'msg': 'The username or password is incorrect'}), 401
    else:
        return jsonify({'msg': "User does not exist"}), 401  # Changed from 404 to 401

# Route for the user to register...
@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def register():
    new_user = request.get_json() #store the json body request
    new_user['password'] = hashlib.sha256(new_user["password"].encode('utf-8')).hexdigest() #encrypt password
    doc = users_collection.find_one({"username": new_user["username"]}) #check if the user exits
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'User already exists'}), 409