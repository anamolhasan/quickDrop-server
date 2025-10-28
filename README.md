# 🚚 QuickDrop – Smart Courier & Delivery Platform (Server Side)

The **QuickDrop Server** is a powerful Node.js + Express.js backend for managing all delivery, authentication, payment, and order operations of the **QuickDrop Smart Courier Platform**.  
It integrates **MongoDB** for data persistence, **Stripe** for secure payments, and **JWT** for robust authentication.

---

## 🌐 Live API URL
🔗 [quick drop server](https://quickdrop-server.up.railway.app)

---

## 🧭 Overview

This backend handles all business logic and secure data management for the **QuickDrop platform**, including:

- 🔐 **JWT Authentication** for secure user login/signup  
- 📦 **Order Management** (create, update, view orders)  
- 💳 **Stripe Payment Integration**  
- 📸 **Digital Proof of Delivery Upload (via Multer)**  
- 📞 **Complaint Box API**  
- ⭐ **Feedback & Rating System**  
- 🧭 **Route Optimization & Real-time Tracking APIs (optional)**  
- 🗄️ **MongoDB Integration** for scalable data storage  

---

## ⚙️ Technologies Used

| Technology | Purpose |
|-------------|----------|
| **Node.js** | Server runtime |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL Database |
| **JWT (jsonwebtoken)** | Secure user authentication |
| **Bcrypt** | Password hashing |
| **Multer** | File uploads (e.g., proof of delivery) |
| **Stripe** | Payment processing |
| **CORS** | Cross-origin request handling |
| **Dotenv** | Environment variable management |
| **Form-Data** | File & form data handling |

---

## 📦 Dependencies

```json
"dependencies": {
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.2",
  "express": "^5.1.0",
  "form-data": "^4.0.4",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.20.0",
  "multer": "^2.0.2",
  "stripe": "^19.1.0"
}


