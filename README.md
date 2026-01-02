# Student Support Chatbot

Angular + TypeScript frontend with Flask backend and LangChain-assisted replies. The chatbot answers student FAQs about courses, exams, assignments, and technical support.

## Quick start

### Backend (Flask)
1. `cd backend`
2. `python -m venv .venv && source .venv/bin/activate`
3. `pip install -r requirements.txt`
4. (Optional) `export OPENAI_API_KEY="sk-..."` for LangChain/OpenAI responses.
5. `python app.py`

### Frontend (Angular)
1. `cd frontend`
2. `npm install`
3. `npm run start`
4. Visit http://localhost:4200

## How it works
- Frontend calls the Flask `/chat` endpoint with `{ "message": "..." }`.
- Backend loads `data.json` FAQs. If LangChain + OpenAI API key are available, it asks the LLM to answer using the FAQ context; otherwise it returns the closest FAQ match.

## Files of interest
- Frontend UI and logic: `frontend/src/app/app.component.*`
- Angular bootstrap: `frontend/src/main.ts`
- Flask API: `backend/app.py`
- FAQ seed data: `data.json`
