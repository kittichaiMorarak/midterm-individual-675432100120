# Library Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** กิตติชัย โมรารักษ์
- **Student ID:** 67543210012-0
- **Course:** ENGSE207 Software Architecture

---

## 🏗️ Architecture Style
**Layered Architecture (3-tier Architecture)**  
ระบบถูกออกแบบโดยแยกโค้ดออกเป็น 3 ชั้นหลัก ได้แก่ Presentation, Business และ Data Layer
เพื่อให้โค้ดมีความชัดเจน ดูแลรักษาง่าย และขยายระบบได้ในอนาคต

---

## 📂 Project Structure

```text
src/
├── presentation/            # Presentation Layer
│   ├── controllers/         # จัดการ HTTP Request / Response
│   ├── routes/              # กำหนด API Routes
│   └── middlewares/         # Error handling
│
├── business/                # Business Layer
│   ├── services/            # Business logic
│   └── validators/          # ตรวจสอบความถูกต้องของข้อมูล
│
├── data/                    # Data Layer
│   ├── repositories/        # ติดต่อฐานข้อมูล
│   └── database/            # Database connection (SQLite)
│
├── app.js                   # Express application setup
└── server.js                # Entry point ของระบบ
