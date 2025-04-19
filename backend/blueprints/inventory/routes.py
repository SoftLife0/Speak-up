from flask import Blueprint
from flask import Flask, render_template, request, redirect, send_file, url_for, flash, session, jsonify


inventory = Blueprint('inventory',__name__)
