#!/bin/bash

# Full-Stack Contact List Application Startup Script

echo "🚀 Starting Full-Stack Contact List Application..."

# Function to check if a port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Start FastAPI backend
echo "📡 Starting FastAPI backend server..."
cd backend
if check_port 8000; then
    echo "⚠️  Port 8000 is already in use. Backend might already be running."
else
    ./venv/bin/python main.py &
    BACKEND_PID=$!
    echo "✅ Backend started with PID: $BACKEND_PID"
fi
cd ..

# Start React frontend
echo "⚛️  Starting React frontend server..."
cd contact-list-app
if check_port 5173; then
    echo "⚠️  Port 5173 is already in use. Frontend might already be running."
else
    npm run dev &
    FRONTEND_PID=$!
    echo "✅ Frontend started with PID: $FRONTEND_PID"
fi
cd ..

echo ""
echo "🎉 Application is starting up!"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "🛑 To stop the servers, press Ctrl+C"
echo ""

# Wait for user to stop
wait

