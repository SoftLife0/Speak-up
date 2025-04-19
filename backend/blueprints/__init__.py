from flask import Flask, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON
from flask_migrate import Migrate
import requests
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager


basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

app=Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'pharma.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['JWT_SECRET_KEY'] = os.environ.get("JWT_SECRET_KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)


db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)



from blueprints.inventory.routes import inventory
app.register_blueprint(inventory, url_prefix='/api/inventory')

from blueprints.auth.routes import auth
app.register_blueprint(auth, url_prefix='/api/auth')

# app.register_blueprint(utils)