from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/newquestion", methods=["POST"])
def get_user_question():
    user_question = request.get_json()
    return jsonify(user_question)

@app.route("/api/newface", methods=["POST"])
def get_user_face():
    user_face = request.get_json()
    return jsonify(user_face)

app.run(port=5000, debug=True)