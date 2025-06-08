from flask import Blueprint
from flask import Flask, render_template, request, redirect, send_file, url_for, flash, session, jsonify
from .models import Category, Product, Inventory, Prescription, PrescriptionItem, User
from apiresponse import ApiResponse
from blueprints import db
from flask_jwt_extended import jwt_required, get_jwt_identity



inventory = Blueprint('inventory',__name__)


@inventory.route('/dashboard', methods=['GET'])
# @jwt_required()
def dashboard_summary():
    # user_email = get_jwt_identity()
    # user = User.query.filter_by(email=user_email).first()

    total_products = Product.query.count()
    total_categories = Category.query.count()
    total_inventory = Inventory.query.count()
    total_prescriptions = Prescription.query.count()
    
    low_stock = db.session.query(Product).join(Inventory).filter(
        Inventory.quantity <= Product.min_stock
    ).count()

    data = {
        "total_products": total_products,
        "total_categories": total_categories,
        "total_inventory": total_inventory,
        "total_prescriptions": total_prescriptions,
        "low_stock": low_stock
    }

    return ApiResponse.success(data, message="Dashboard summary retrieved successfully"), 200


# Create category
@inventory.route('/categories', methods=['POST'])
def crate_category():
    if request.method == 'POST':
        
        data = request.get_json()
        name = data.get('name')
        print(name)
        
        if not name:
            return ApiResponse.error("Category name is required"), 400
        
        # check for duplicate
        existing_category = Category.query.filter_by(name=name).first()
        if existing_category:
            return ApiResponse.error("Category already exists"), 400
        
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
                # "created_at": category.created_at.strftime("%Y-%m-%d %H:%M:%S")
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
    
    
# Create Product
@inventory.route('/product', methods=['POST'])
def create_product():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        category_id = data.get('category_id')
        price = data.get('price')
        description = data.get('description')
        min_stock = data.get('min_stock', 0)

        if not name or not category_id or not price or not description:
            return ApiResponse.error("All fields are required"), 400
        
        existing_product = Product.query.filter_by(name=name).first()
        if existing_product:
            return ApiResponse.error("Product already exists"), 400

        product = Product(name=name, category_id=int(category_id), unit_price=float(price), description=description, min_stock=int(min_stock))
        db.session.add(product)
        db.session.commit()

        data = {
            "id": product.id,
            "name": product.name,
            "category_id": product.category_id,
            "unit_price": product.unit_price,
            "description": product.description,
            "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        print("Product Created", data)
        return ApiResponse.success(data, message="Product created successfully"), 201
    
# Get all Product
@inventory.route('/product', methods=['GET'])
def get_all_products():
    if request.method == 'GET':
        all_products = Product.query.all()
        data = []
        for product in all_products:
            data.append({
                "id": product.id,
                "name": product.name,
                "category_id": product.category_id,
                "unit_price": product.unit_price,
                "description": product.description,
                "min_stock": product.min_stock,
                "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S")
            })
        print("All Products", data)
        return ApiResponse.success(data, message="Products retrieved successfully"), 200
    
# Edit Product
@inventory.route('/product/<int:product_id>', methods=['PUT'])
def edit_product(product_id):
    if request.method == 'PUT':
        data = request.get_json()
        name = data.get('name')
        category_id = data.get('category_id')
        price = data.get('price')
        description = data.get('description')
        min_stock = data.get('min_stock')

        if not name or not category_id or not price or not description:
            return ApiResponse.error("All fields are required"), 400

        product = Product.query.get(product_id)

        if not product:
            return ApiResponse.error("Product not found"), 404

        product.name = name
        product.category_id = int(category_id)
        product.unit_price = float(price)
        product.description = description
        product.min_stock = int(min_stock)
        db.session.commit()

        updated_data = {
            "id": product.id,
            "name": product.name,
            "category_id": product.category_id,
            "unit_price": product.unit_price,
            "description": product.description,
            "min_stock": product.min_stock,
            "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        print("Product Updated", updated_data)
        return ApiResponse.success(data=updated_data, message="Product updated successfully"), 200
    
    
# Delete Product
@inventory.route('/product/<int:product_id>', methods=['POST'])
def delete_product(product_id):
    if request.method == 'POST':
        product = Product.query.get(product_id)

        if not product:
            return ApiResponse.error("Product not found"), 404

        db.session.delete(product)
        db.session.commit()

        print("Product Deleted", product_id)
        return ApiResponse.success(message="Product deleted successfully"), 200
