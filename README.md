# Online Exam & Evaluation API

A backend platform for managing online tests, auto-evaluation, student assessments, and scoring analytics.

## Features
- Authentication (JWT, roles)
- Exam scheduling
- Question management
- Answer submission
- Score generation
- Ranking reports
- File uploads (Multer + Cloudinary)
- Search, filters, pagination
- Dashboard & analytics
- Ready for deployment (Render/Railway)

## Getting Started
1. Clone the repo
2. Install dependencies
3. Set up `.env` variables
4. Run `node server.js`

## API Endpoints
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
- Exams: `/api/exams`
- Questions: `/api/questions`, `/api/questions/:examId`
- Attempts: `/api/attempts/submit`, `/api/attempts/:studentId`
- Results: `/api/results/:studentId`
- Upload: `/api/upload`
- Reports: `/api/reports/summary`, `/api/reports/monthly`

## Deployment
- Ready for Render/Railway
