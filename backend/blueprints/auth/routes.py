from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta
from apiresponse import ApiResponse
from blueprints import db
from blueprints.inventory.models import User 

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Register data ", data)
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get('role') 

    if not username or not email or not password:
        return ApiResponse.error("All fields are required"), 400

    existing_user = User.query.filter((User.email == email)).first()

    if existing_user:
        return ApiResponse.error("User already exists"), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
    new_user = User(username=username, email=email, password=hashed_password, role=role)
    response_data = {"username": new_user.username,"email": new_user.email}

    db.session.add(new_user)
    db.session.commit()

    print("New User", response_data)
    return ApiResponse.success(data=response_data, message="User registered successfully"), 201


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return ApiResponse.error("Email and password are required"), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return ApiResponse.error("Invalid credentials"), 401
    
    access_token = create_access_token(identity=user.email, expires_delta=timedelta(days=1))


    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "token": access_token,
        "role": user.role,
        "created_at": user.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }

    response_data = {
        "user": user_data
    }

    return ApiResponse.success(response_data, message="Login successful"), 200
