from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Dict, List, Tuple

from flask import Flask, jsonify, request
from flask_cors import CORS

# Optional LangChain import: we try to use it if available, otherwise fall back to FAQ lookup.
try:  # pragma: no cover - external dependency
    from langchain.chat_models import ChatOpenAI
    from langchain.prompts import ChatPromptTemplate

    LANGCHAIN_AVAILABLE = True
except Exception:  # pragma: no cover - handled gracefully
    LANGCHAIN_AVAILABLE = False


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
    return best_answer, best_score


def generate_reply(message: str, faq: List[Dict[str, str]]) -> str:
    """Use LangChain + OpenAI if configured, otherwise fall back to FAQ lookup."""
    # Fast path: heuristic FAQ match
    fallback_answer, score = best_faq_match(message, faq)

    # If LangChain is available and we have an API key, try a short LLM answer.
    if LANGCHAIN_AVAILABLE and os.environ.get("OPENAI_API_KEY"):
        try:
            faq_text = "\n".join([f"Q: {item['question']}\nA: {item['response']}" for item in faq])
            prompt = ChatPromptTemplate.from_template(
                """Tu es un assistant académique pour les étudiants. Utilise la FAQ fournie pour répondre de façon concise.\n\nFAQ:\n{faq}\n\nQuestion: {question}\nRéponse en français:"""
            )
            model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.2)
            messages = prompt.format_messages(question=message, faq=faq_text)
            response = model(messages)
            content = getattr(response, "content", "").strip()
            if content:
                return content
        except Exception as exc:  # pragma: no cover - logging only
            print(f"LangChain/OpenAI fallback triggered: {exc}")

    # Fallback to heuristic answer
    return fallback_answer


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
