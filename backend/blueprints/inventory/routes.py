from flask import Blueprint
from flask import Flask, render_template, request, redirect, send_file, url_for, flash, session, jsonify
from .models import Category, Product, Inventory, Prescription, PrescriptionItem
from apiresponse import ApiResponse
from blueprints import db


inventory = Blueprint('inventory',__name__)

# Create category
@inventory.route('/categories', methods=['POST'])
def crate_category():
    if request.method == 'POST':
        
        data = request.get_json()
        name = data.get('name')
        print(name)
        
        if not name:
            return ApiResponse.error("Category name is required"), 400
        
        category = Category(name=name)
        db.session.add(category)
        db.session.commit()
        
        data = {
            "id": category.id,
            "name": category.name,
            "created_at": category.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return ApiResponse.success(data, message="Category created successfully"), 201
