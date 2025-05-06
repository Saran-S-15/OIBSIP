# 🍕 Pizza Customization & Delivery App

This is a full-stack **Pizza Customization & Delivery Web Application** built during my internship at **Oasis Infobyte** under the **Web Development and Designing** domain. The application allows users to build their own pizzas, place orders, and track them, while also enabling admins to manage inventory, receive stock alerts, and view order histories.

---

## 🔥 Features

-- **User & Admin Authentication**  
-- **JWT-based** secure auth flow  
-- **Email Verification**, Forgot/Reset Password via **NodeMailer**  
-- **Pizza Customization** (Choose base, sauce, cheese, veggies, optional meat)  
-- **Real-time Price Calculation**  
-- **Inventory Management** (CRUD for admin, live stock status)  
-- **Low Stock Alert Emails** sent to admin  
-- **Order Processing** (Track stages like Processing, Cooking, Delivery)  
-- **Razorpay Payment Integration**  
-- **Responsive UI** with Tailwind CSS  
-- **Admin Dashboard** with full control

---

## 🛠️ Tech Stack

### 🔹 **Frontend**
-- React.js  
-- Tailwind CSS  
-- Zustand (Global State Management)  
-- Formik + Yup (Form Validation)  
-- React Router DOM  
-- Lucide React (Icons)

### 🔹 **Backend**
-- Node.js  
-- Express.js  
-- MongoDB with Mongoose  
-- JSON Web Tokens (JWT)  
-- Nodemailer (for Email Services)  
-- Razorpay API (Payment Gateway)

### 🔹 **Dev Tools & Deployment**
-- **Database**: MongoDB Atlas  
-- Postman for API Testing  
-- Git & GitHub for Version Control

---

## 🔒 Authentication Flow

-- JWT used for user and admin sessions  
-- Protected routes based on role
-- AdminProtectedRoute for admin
-- Token stored in localStorage  
-- Email verification and password reset links via Nodemailer

---

## 📧 Low Stock Email Alert

When the stock for any ingredient falls below a threshold (20 units), an automatic email is sent to the admin via **NodeMailer**

```javascript

💰 Payment Gateway

Razorpay integration allows users to securely make payments for their customized pizza orders.

– Payment verification handled on both client and server
– Order status updated post-successful transaction

⸻

🧪 Testing

– Manual testing with Postman for all routes
– Real-time scenario testing with email triggers and payment flow
– Form validation with Yup and frontend error handling

⸻

🧑‍💻 Author

Name: Saran S
Intern at: Oasis Infobyte
Domain: Web Development & Designing
LinkedIn: linkedin.com/in/saran-s-8765b0258
GitHub: https://github.com/Saran-S-15

⸻

📌 License

This project is licensed under the MIT License.

⸻

🙌 Acknowledgements

Special thanks to Oasis Infobyte for this opportunity to gain real-world experience and explore full-stack web development.

⸻

🔖 Tags
#oasisinfobyte #webdevelopment #internship
---

Let me know if you'd like a downloadable `.md` file or help deploying this to GitHub with images, badges, or workflow actions.
