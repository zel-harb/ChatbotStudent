from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Dict, List, Tuple

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent.parent
FAQ_PATH = BASE_DIR / "data.json"


def load_faq() -> List[Dict[str, str]]:
    if not FAQ_PATH.exists():
        return []
    with FAQ_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def best_faq_match(message: str, faq: List[Dict[str, str]]) -> Tuple[str, float]:
    """Return the best FAQ answer with a tiny similarity score heuristic."""
    message_lower = message.lower()
    best_score = 0.0
    best_answer = "Je n'ai pas trouvé une réponse précise, mais je peux te rediriger vers le support."  # default fallback

    for item in faq:
        question = item.get("question", "").lower()
        answer = item.get("response", "")
        if not question:
            continue
        overlap = len(set(message_lower.split()) & set(question.split()))
        score = overlap / max(len(question.split()), 1)
        if score > best_score:
            best_score = score
            best_answer = answer
        # print(f"FAQ match score for '{question}': {score}")
    return best_answer, best_score


def generate_reply(message: str, faq: List[Dict[str, str]]) -> str:
    """Match user message with FAQ entries."""
    answer, score = best_faq_match(message, faq)
    return answer
@app.post("/chat")
def chat() -> tuple:
    payload = request.get_json(silent=True) or {}
    user_message = (payload.get("message") or "").strip()

    if not user_message:
        return jsonify({"error": "Field 'message' is required"}), 400

    faqs = load_faq()
    reply = generate_reply(user_message, faqs)
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
