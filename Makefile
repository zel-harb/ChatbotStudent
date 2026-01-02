.PHONY: help install install-backend install-frontend build build-frontend run run-backend run-frontend dev clean

help:
	@echo "Chatbot Project Makefile"
	@echo "========================"
	@echo "Available targets:"
	@echo "  make install           - Install all dependencies (backend + frontend)"
	@echo "  make install-backend   - Install backend dependencies"
	@echo "  make install-frontend  - Install frontend dependencies"
	@echo "  make build             - Build frontend (production)"
	@echo "  make build-frontend    - Build frontend (production)"
	@echo "  make run               - Run both backend and frontend"
	@echo "  make run-backend       - Run backend server only"
	@echo "  make run-frontend      - Run frontend dev server only"
	@echo "  make dev               - Run both in development mode (recommended)"
	@echo "  make clean             - Clean build files and node_modules"

install: install-backend install-frontend
	@echo "✓ All dependencies installed!"

install-backend:
	@echo "Installing backend dependencies..."
	cd backend && pip install -r requirements.txt
	@echo "✓ Backend dependencies installed!"

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "✓ Frontend dependencies installed!"

build: build-frontend
	@echo "✓ Build complete!"

build-frontend:
	@echo "Building frontend for production..."
	cd frontend && npm run build
	@echo "✓ Frontend built!"

run-backend:
	@echo "Starting backend server..."
	cd backend && python3 app.py

run-frontend:
	@echo "Starting frontend dev server..."
	cd frontend && npm start

run: run-backend run-frontend

dev:
	@echo "Starting development environment..."
	@echo "Starting backend and frontend servers..."
	@(cd backend && python3 app.py) & \
	(cd frontend && npm start)

clean:
	@echo "Cleaning build files..."
	rm -rf frontend/dist frontend/node_modules
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	@echo "✓ Clean complete!"

frontend:
	@echo "Setting up frontend..."
	cd frontend && npm install @angular/animations@^21.0.0 @angular/common@^21.0.0 @angular/compiler@^21.0.0 @angular/core@^21.0.0 @angular/forms@^21.0.0 @angular/platform-browser@^21.0.0 @angular/platform-browser-dynamic@^21.0.0 @angular/router@^21.0.0
	@echo "✓ Frontend setup complete!"
