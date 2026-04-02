print("🚀 STARTING SCRIPT...")

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.multioutput import MultiOutputClassifier
import pickle

print("📂 Loading dataset...")

# Load dataset
df = pd.read_csv("data/train.csv")

print("✅ Dataset loaded!")

# Features and labels
X = df["comment_text"]

labels = ["toxic", "insult", "obscene", "threat"]
Y = df[labels]

print("🔀 Splitting data...")

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

print("🧠 Vectorizing text...")

vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)

print("🤖 Training model... (this may take some time)")

model = MultiOutputClassifier(LogisticRegression())
model.fit(X_train_vec, Y_train)

print("💾 Saving model...")

# Save model
with open("app/multilabel_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Save vectorizer
with open("app/multilabel_vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)

print("✅ Multi-label model trained and saved!")
print("🔥 DONE")