from flask import Blueprint, current_app, jsonify, request
from flask_mail import Message
from extensions import mail
import os
from dotenv import load_dotenv
load_dotenv()

emails = Blueprint('emails',__name__, url_prefix='/api/v1/emails')

@emails.route('/send-email', methods=['POST'])
def send_email():
    try:
        latitude = request.json.get('latitude')
        longitude = request.json.get('longitude')
        severity = request.json.get('severity')
        location = request.json.get('location')
        
        if not all([latitude, longitude, severity, location]):
            return jsonify({
                "status": "error",
                "message": "Missing required fields: latitude, longitude, severity, location"
            }), 400
        
        email_sender = os.getenv('EMAIL')
        email_recipient = os.getenv('SENDTO')
        
        if not email_sender or not email_recipient:
            return jsonify({
                "status": "error",
                "message": "Email configuration missing. Please set EMAIL and SENDTO in .env file"
            }), 500
        
        googleMapLink = 'https://www.google.com/maps/search/?api=1&query={},{}'.format(latitude, longitude)
        msg = Message(
            subject="🚨 Accident Alert - Severity({})".format(severity),
            sender=email_sender,
            recipients=[email_recipient]
        )
        msg.body = "🚨 Accident Alert - Severity({})\nLocation: {}\nGoogle Map: {}".format(severity, location, googleMapLink)
        
        mail.send(msg)
        return jsonify({
            "status": "success",
            "message": "Email sent successfully."
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Failed to send email: {str(e)}"
        }), 500
