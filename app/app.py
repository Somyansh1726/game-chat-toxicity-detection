from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

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

    if not text or not text.strip():
        return jsonify({"error": "No text provided"}), 400

    text_vec = vectorizer.transform([text])
    probs = model.predict_proba(text_vec)

    labels = ["toxic", "insult", "obscene", "threat"]
    result = {}

    max_label = ""
    max_conf = 0

    for i, label in enumerate(labels):
        prob = float(probs[i][0][1])
        conf = round(prob * 100, 2)

        result[label] = {
            "value": prob > 0.3,
            "confidence": conf
        }

        if conf > max_conf:
            max_conf = conf
            max_label = label

    if max_conf < 40:
        severity = "LOW"
    elif max_conf < 75:
        severity = "MEDIUM"
    else:
        severity = "HIGH"

    if severity == "LOW":
        explanation = f"Message is mostly safe with low toxicity ({max_conf}%)"
    elif severity == "MEDIUM":
        explanation = f"Message shows some toxic behavior ({max_label}) with {max_conf}% confidence"
    else:
        explanation = f"High risk message detected ({max_label}) with {max_conf}% confidence"

    return jsonify({
        "labels": result,
        "max_label": max_label,
        "max_confidence": max_conf,
        "severity": severity,
        "explanation": explanation
    })

if __name__ == "__main__":
    app.run(debug=True)