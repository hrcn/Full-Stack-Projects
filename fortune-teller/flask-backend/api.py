from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from test import hello, generate_text

app = Flask(__name__)
cors = CORS(app)

@app.route("/", methods=["GET"])
def home():
    return hello()

@app.route("/api/newquestion", methods=['POST'])
@cross_origin()
def get_user_question():
    data = request.get_json(force=True)['question']
    result = generate_text(data)
    return jsonify(result) # jsonify() converts lists and dictionaries to JSON format

app.run(port=5000, debug=True)
