# 📝 Open Forms

**Open Forms** is a lightweight, customizable form submission platform that allows users to create and share forms, and have responses saved directly to a creator’s database.

> 🚧 Backend is currently under development – expect frequent updates!

---

## ✨ Features

- 🔹 Simple and responsive frontend UI
- 🔹 Form submission using vanilla JavaScript
- 🔹 Saves user responses linked to a form creator
- 🔹 MongoDB used for flexible data storage
- 🔹 Easy to extend for analytics, dashboards, and more

---

## 🛠 Tech Stack

| Area      | Tech                     |
|-----------|--------------------------|
| Frontend  | HTML, CSS, JavaScript    |
| Backend   | Node.js, Express (WIP)   |
| Database  | MongoDB                  |

---

## 📁 Project Structure

open-forms/ ├── frontend/ │ ├── index.html # Main form UI │ └── form.js # Handles form submission │ ├── backend/ │ ├── server.js # Express server for form handling │ ├── package.json # Backend dependencies │ └── .env # (Optional) MongoDB URI and other config │ └── README.md # Project documentation


---

## 🚀 Getting Started

### ⚙️ Backend Setup (WIP)

1. Navigate to the backend folder:
   ```bash
   cd backend
Install dependencies:

bash
Copy
Edit
npm install
Start the backend server:

bash
Copy
Edit
node server.js
Note: Ensure MongoDB is running locally or update .env with a connection string to MongoDB Atlas.

🌐 Frontend Setup
Open frontend/index.html in a browser.

Fill the form and submit.

Data is sent to the backend and stored under the creator's entry.

📌 To-Do List
 Form UI

 POST request to backend

 Store response with creator ID

 Form field validation

 Backend authentication

 Creator dashboard to view responses

 Deployment on cloud (frontend + backend)

🤝 Contributing
Feel free to fork this repo and submit a pull request. Any help with backend or form customization is appreciated!
 
