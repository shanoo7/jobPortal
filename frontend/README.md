# 🧑‍💼 Job Portal - MERN Stack Application

A **full-stack Job Portal** built with the **MERN stack** (MongoDB, Express, React, Node.js), supporting **Student** and **Recruiter** roles. Includes features like job posting, resume upload, application tracking, and authentication.

---

## 🔗 Live Link

🌐 Website: [https://........com]

---

## 📂 Project Structure

```bash
job-portal/
│
├── frontend/           # React + Vite (Client)
└── backend/            # Express + MongoDB (Server)



---

##  Features

###  Student
- Signup/Login as student
- Browse and search jobs
- Apply to jobs (once per job)
- Upload resume 
- Track application status (Pending/Accepted/Rejected)

###  Recruiter
- Signup/Login as recruiter
- Post new jobs
- Edit and manage job status (Open/Close)
- View applicants for each job
- Update application statuses

###  Common
- Role-based protected routes
- JWT authentication with secure cookies
- Resume upload
- Form validation using Zod
- Responsive UI with modern animations

---

##  Tech Stack

### Frontend (client/)
| Feature              | Tech                                                  |
|----------------------|--------------------------------------------------------|
| Framework            | React 19, Vite                                         |
| Styling              | Tailwind CSS, `shadcn/ui`, Lucide icons                |
| Routing              | React Router v7                                        |
| State Management     | Redux Toolkit, Redux Persist                           |
| Forms & Validation   | React Hook Form, Zod                                   |
| API & Cookies        | Axios, js-cookie                                       |
| UI Components        | Radix UI, Headless UI                                  |
| File Upload Preview  | Cloudinary                                             |
| Notifications        | Sonner toast                                           |

### Backend (backend/)
| Feature              | Tech                                                  |
|----------------------|--------------------------------------------------------|
| Server               | Express.js                                             |
| Database             | MongoDB with Mongoose                                  |
| Authentication       | JWT + bcryptjs + HttpOnly cookie                       |
| File Upload          | Multer, Cloudinary, DataURI                            |
| Middleware           | CORS, cookie-parser, dotenv                            |
| Dev Tools            | Nodemon                                                |

---


