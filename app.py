from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load trained model and vectorizer
with open("toxicity_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf_vectorizer.pkl", "rb") as f:
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
    prediction = model.predict(text_vec)[0]

    if prediction == 1:
        result = "toxic"
    else:
        result = "clean"

    return jsonify({
        "input_text": text,
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True)