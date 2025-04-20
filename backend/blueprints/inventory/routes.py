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
        print("Category Created", data)
        return ApiResponse.success(data, message="Category created successfully"), 201
    
    
# Get All Category
@inventory.route('/categories', methods=['GET'])
def get_all_categories():
    if request.method == 'GET':
        all_categories = Category.query.all()
        data = []
        for category in all_categories:
            data.append({
                "id": category.id,
                "name": category.name,
                "created_at": category.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })
        print("All Categories", data)
        return ApiResponse.success(data, message="Categories retrieved successfully"), 200
    
# Edit Category
@inventory.route('/categories/<int:category_id>', methods=['PUT'])
def edit_category(category_id):
    if request.method == 'PUT':
        data = request.get_json()
        name = data.get('name')

        if not name:
            return ApiResponse.error("Category name is required"), 400

        category = Category.query.get(category_id)

        if not category:
            return ApiResponse.error("Category not found"), 404

        category.name = name
        db.session.commit()

        data = {
            "id": category.id,
            "name": category.name,
            "created_at": category.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        print("Category Updated", data)
        return ApiResponse.success(data, message="Category updated successfully"), 200


# Delete Category
@inventory.route('/categories/<int:category_id>', methods=['POST'])
def delete_category(category_id):
    if request.method == 'POST':
        category = Category.query.get(category_id)

        if not category:
            return ApiResponse.error("Category not found"), 404

        db.session.delete(category)
        db.session.commit()

        print("Category Deleted", category_id)
        return ApiResponse.success(message="Category deleted successfully"), 200