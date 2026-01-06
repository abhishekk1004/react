# Abhishek's Portfolio

A full-stack portfolio application with React frontend and Django backend.

## 📁 Project Structure

```
portfolio_/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   ├── package.json
│   └── README.md
└── backend/           # Django REST API
    ├── manage.py
    ├── requirements.txt
    └── README.md
```

## 🚀 Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access at `http://localhost:5173`

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Access at `http://localhost:8000`

## 📝 Features

- ✨ Modern React UI with animations
- 🎨 Tailwind CSS styling
- 🔐 Django REST API
- 📱 Responsive design
- 🌙 Dark mode support

## 🔗 API Connection

Frontend connects to Django backend at:
```
http://localhost:8000/api/
```

Configure in `frontend/src/lib/api.ts`

## 📦 Technologies

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

**Backend:**
- Django
- Django REST Framework
- PostgreSQL (or SQLite)

## 📄 License

MIT
