# app/__init__.py
from flask import Flask

app = Flask(__name__)

# Import routes after app initialization to avoid circular imports
from .main import *

