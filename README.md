# Full-Stack Contact List Application

A modern, full-stack contact management application built with **FastAPI** backend and **React** frontend, featuring beautiful **shadcn/ui** components with smooth animations.

## 🚀 Live Demo

[View Live Application](https://contact-list-demo.vercel.app) *(Hypothetical deployment link)*

## ✨ Features

### Backend (FastAPI)
- **RESTful API** with full CRUD operations for contacts
- **SQLite Database** with SQLAlchemy ORM
- **Automatic API Documentation** with Swagger UI
- **CORS Support** for frontend integration
- **Data Validation** with Pydantic models
- **Error Handling** with proper HTTP status codes

### Frontend (React + shadcn/ui)
- **Modern UI Components** using shadcn/ui design system
- **Smooth Animations** with Framer Motion
- **Real-time Search** with instant filtering
- **Responsive Design** for all device sizes
- **Form Validation** with error states
- **Loading States** and error handling
- **Modal Dialogs** for add/delete operations

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server for FastAPI
- **SQLite** - Lightweight database

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **shadcn/ui** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful, customizable SVG icons

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- Python 3.8+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the FastAPI server**
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd contact-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
tria-assignment/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── contacts.db            # SQLite database (created automatically)
├── contact-list-app/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactItem.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── AddContactForm.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── services/
│   │   │   └── api.js          # API service layer
│   │   ├── lib/
│   │   │   └── utils.js        # Utility functions
│   │   ├── App.jsx             # Main application
│   │   └── main.jsx           # Application entry point
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔧 API Endpoints

### Contacts
- `GET /contacts` - Get all contacts (with optional search)
- `GET /contacts/{id}` - Get specific contact
- `POST /contacts` - Create new contact
- `PUT /contacts/{id}` - Update contact
- `DELETE /contacts/{id}` - Delete contact
- `GET /contacts/search/{term}` - Search contacts

### System
- `GET /` - API status
- `GET /health` - Health check

## 🎨 Design System

### shadcn/ui Components Used
- **Button** - Interactive buttons with variants
- **Card** - Content containers with shadows
- **Dialog** - Modal dialogs for forms and confirmations
- **Input** - Form input fields with validation
- **Toast** - Notification system (ready for implementation)

### Animation Features
- **Page Load Animations** - Staggered entrance effects
- **Hover Animations** - Scale and shadow transitions
- **Form Animations** - Smooth validation feedback
- **List Animations** - Layout animations for add/remove
- **Loading Animations** - Spinning indicators and progress

## 🎯 Key Features Implementation

### Backend Features
- **Database Models** - SQLAlchemy models with relationships
- **API Validation** - Pydantic models for request/response validation
- **Error Handling** - Comprehensive error responses
- **CORS Configuration** - Cross-origin resource sharing
- **Auto Documentation** - Swagger UI integration

### Frontend Features
- **Component Architecture** - Modular, reusable components
- **State Management** - React hooks for local state
- **API Integration** - Service layer for backend communication
- **Form Handling** - Controlled components with validation
- **Error Boundaries** - Graceful error handling

## 🚀 Deployment

### Backend Deployment
The FastAPI backend can be deployed to:
- **Railway** - Easy Python deployment
- **Heroku** - Platform as a service
- **DigitalOcean** - VPS deployment
- **AWS/GCP/Azure** - Cloud platforms

### Frontend Deployment
The React frontend can be deployed to:
- **Vercel** - Optimized for React applications
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting for public repos
- **AWS S3 + CloudFront** - Scalable static hosting

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL=sqlite:///./contacts.db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### API Configuration
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000'; // Change for production
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast web framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

---

**Built with ❤️ using FastAPI, React, and shadcn/ui**