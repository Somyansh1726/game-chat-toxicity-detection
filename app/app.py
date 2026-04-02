from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model and vectorizer
with open("multilabel_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("multilabel_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

@app.route("/")
def home():
    return "Game Chat Toxicity Detection API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if text.strip() == "":
        return jsonify({"error": "No text provided"}), 400

    text_vec = vectorizer.transform([text])

    probs = model.predict_proba(text_vec)

    labels = ["toxic", "insult", "obscene", "threat"]
    result = {}

    for i, label in enumerate(labels):
        prob = probs[i][0][1]
        result[label] = bool(prob > 0.3)

    print("PREDICTION:", result)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)


