# app/main.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from .services.ai_generator import AIGenerator
from datetime import datetime

app = Flask(__name__)
generator = AIGenerator()

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/get-message', methods=['GET'])
def get_message():
    return jsonify({"message": "Hello from Flask! Button was clicked!"})

@app.route('/test-connection', methods=['GET'])
def test_connection():
    return jsonify({
        "message": "Successfully connected to backend!",
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

@app.route('/code/hints', methods=['POST'])
def get_code_hints():
    try:
        data = request.json
        problem = data.get('problem')
        print(f"Problem = {problem}")
        response = generator.generate_code_hints(problem)
        print(f"Hints = {response.text}")
        return jsonify({"hints": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/code/approach', methods=['POST'])
def get_code_approach():
    try:
        data = request.json
        problem = data.get('problem')
        response = generator.generate_code_approach(problem)
        return jsonify({"approach": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/code/solution', methods=['POST'])
def get_code_solution():
    try:
        data = request.json
        problem = data.get('problem')
        language = data.get('language')
        print(f"Actually language in flask is = {language}")
        response = generator.generate_code_solution(problem, language)
        return jsonify({"solution": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500