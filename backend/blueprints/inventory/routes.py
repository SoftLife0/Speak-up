from datetime import datetime
from decimal import Decimal
from flask import Blueprint
from flask import Flask, render_template, request, redirect, send_file, url_for, flash, session, jsonify
from .models import Category, Product, Inventory, Prescription, PrescriptionItem, User
from apiresponse import ApiResponse
from blueprints import db
from flask_jwt_extended import jwt_required, get_jwt_identity



inventory = Blueprint('inventory',__name__)


@inventory.route('/dashboard', methods=['GET'])
def dashboard_summary():
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
@inventory.route('/create_product', methods=['POST'])
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

        product = Product(name=name, category_id=int(category_id), unit_price=Decimal(price), description=description, min_stock=int(min_stock))
        db.session.add(product)
        db.session.commit()

        product_data = {
            "id": product.id,
            "name": product.name,
            "category_id": product.category_id,
            "unit_price": product.unit_price,
            "description": product.description,
            "created_at": product.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        response_data = {"products": product_data}
        print("Product Created", response_data)
        return ApiResponse.success(response_data, message="Product created successfully"), 201
    
# Get all Product
@inventory.route('/allproducts', methods=['GET'])
def get_all_products():
    if request.method == 'GET':
        all_products = Product.query.all()
        data = []
        for product in all_products:
            inventory = Inventory.query.filter_by(product_id=product.id).first()
            data.append({
                "id": product.id,
                "name": product.name,
                "category_id": product.category_id,
                "unit_price": product.unit_price,
                "description": product.description,
                "min_stock": product.min_stock,
                "stock": inventory.quantity if inventory else 0,
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
        product.unit_price = Decimal(price)
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



# Stock Intake
@inventory.route("/add_stock", methods=["POST"])
def add_stock():
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity")

    if not product_id or not quantity:
        return jsonify({"error": "Product and quantity required"}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found"}), 404

    inventory = Inventory.query.filter_by(product_id=product.id).first()

    if inventory:
        inventory.quantity += quantity
        inventory.updated_at = datetime.utcnow()
    else:
        inventory = Inventory(product_id=product.id, quantity=quantity)
        db.session.add(inventory)

    db.session.commit()

    return ApiResponse.success({"quantity": quantity, "product": product.name}, message=f"Added {quantity} to inventory for {product.name}"), 200

# Add prescribtion
@inventory.route('/sell', methods=['POST'])
def create_sale():
    data = request.get_json()
    customer_name = data.get("customer_name")
    items = data.get("items")

    if not customer_name or not items:
        return ApiResponse.error("Missing customer name or items"), 400

    total_amount = sum(item["subtotal"] for item in items)

    # Let SQLAlchemy generate the prescription ID automatically
    prescription = Prescription(
        customer_name=customer_name,
        total_amount=total_amount
    )
    db.session.add(prescription)
    db.session.flush()  # Get the auto-generated ID before commit

    for item in items:
        product_id = item["product_id"]
        quantity = item["quantity"]
        subtotal = item["subtotal"]

        product = Product.query.get(product_id)
        if not product:
            db.session.rollback()
            return ApiResponse.error(f"Product ID {product_id} not found"), 404

        inventory = product.inventory_item
        if not inventory or inventory.quantity < quantity:
            db.session.rollback()
            return ApiResponse.error(f"Insufficient stock for {product.name}"), 400

        inventory.quantity -= quantity

        pres_item = PrescriptionItem(
            prescription_id=prescription.id,  # use auto-generated ID
            product_id=product_id,
            quantity=quantity,
            subtotal=subtotal
        )
        db.session.add(pres_item)

    db.session.commit()

    data = {
        "prescription_id": prescription.id,
        "total": total_amount
    }
    return ApiResponse.success(data, message="Sale successful"), 201



# Get all Transaction
@inventory.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Prescription.query.order_by(Prescription.created_at.desc()).all()
    result = [
        {
            "id": tx.id,
            "customer_name": tx.customer_name,
            "total_amount": tx.total_amount,
            "created_at": tx.created_at.isoformat()
        }
        for tx in transactions
    ]
    return ApiResponse.success(result, message="Transactions retrieved successfully"), 200



# Get Low Stock
@inventory.route("/low-stock", methods=["GET"])
def get_low_stock():
    low_stock_items = (
        db.session.query(Product, Inventory, Category)
        .join(Inventory, Product.id == Inventory.product_id)
        .join(Category, Product.category_id == Category.id)
        .filter(Inventory.quantity <= Product.min_stock)
        .all()
    )

    result = [
        {
            "id": product.id,
            "name": product.name,
            "stock": inventory.quantity,
            "category": category.name
        }
        for product, inventory, category in low_stock_items
    ]

    return ApiResponse.success(result, message="Low stock items retrieved successfully"), 200
