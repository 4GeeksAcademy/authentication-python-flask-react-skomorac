"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/token", methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })



@api.route('/signup', methods=['POST'])
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({"msg": "Email can't be empty"}), 400

    if password is None:
        return jsonify({"msg": "Password can't be empty"}), 400
    
    user = User(
        email = email,
        password = password,
        is_active = True
    )

    db.session.add(user)
    db.session.commit()
    
    return jsonify({"msg": "New User created"}), 201


# Protect a route with jwt_required, which will kick out requests without a valid JWT
@api.route("/validate", methods=["GET"])
@jwt_required()
def validate():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200
