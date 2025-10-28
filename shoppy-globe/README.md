# 🛍️ ShoppyGlobe

## 🧩 Introduction  
ShoppyGlobe is a full-stack  **e-commerce web application** built using **React, Redux, Tailwind CSS**, and **Node.js (Express)** and **MongoDB** for the backend.  
It allows users to browse products, view details, manage cart items, and perform authentication operations securely.  
The application is optimized for performance and works seamlessly across all devices.

---

## ✨ Features  
- 💻 **Responsive Design** – Works perfectly on desktop, tablet, and mobile.  
- 🛒 **Cart Management** – Add, update, or remove products dynamically.  
- 📦 **Product Details Page** – Displays product info, ratings, and pricing.  
- 🔐 **User Authentication** – Signup and login with JWT-based security.  
- ⚙️ **API Integration** – Custom backend API for products, cart, and users.  
- ⚡ **Optimized Performance** – Lazy loading, clean routing, and efficient state management.  
- 💬 **Error Handling** – User-friendly messages for API or validation issues.  
- 🎨 **Modern UI** – Built using Tailwind CSS for a sleek and consistent look.  

---

## 🛠️ Technologies Used  
- **Frontend:** React, Redux Toolkit, Tailwind CSS, React Router, React Toastify  
- **Backend:** Node.js, Express.js, MongoDB (via Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  
- **Build Tool:** Vite  
- **Version Control:** Git & GitHub  

---

## ⚙️ Installation Process  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Rathan97/shoppy-globe-ecommerce-application.git
```

### 2️⃣ Navigate to the project directory  
```bash
cd shoppy-globe
```

### 3️⃣ Install dependencies  
Since both frontend and backend dependencies are managed together, run:
```bash
npm install
```

### 4️⃣ Create a `.env` file in the root directory of Backend folder

```bash
Backend/.env
```

Include the following environment variables:
```
JWT_SECRET=your_secret_key
JWT_EXPIRE=1d
```

### 5️⃣ Start the development server of frontend in one terminal
```bash
npm run dev
```

### 6️⃣ Start the backend server in another terminal
```bash
npm start
```

### 7️⃣ Open in your browser  
```bash
http://localhost:5173
```



---

## 📂 Folder Structure  
```
shoppy-globe/
 ├── Backend/
 │   ├── controllers/
 │   │   ├── cart.controller.js
 │   │   ├── product.controller.js
 │   │   └── user.controller.js
 │   │
 │   ├── middleware/
 │   │   └── authmiddleware.js
 │   │
 │   ├── models/
 │   │   ├── cart.js
 │   │   ├── db1.js // run this file to store the products data in mongoDB.
 │   │   ├── Product.js
 │   │   ├── dbConnection.js
 │   │   └── user.js
 │   │
 │   ├── routes/
 │   │   ├── cart.route.js
 │   │   ├── product.route.js
 │   │   └── user.route.js
 │   │
 │   ├── .env
 │   └── app.js
 │
 ├── src/
 │   ├── components/
 │   │   ├── Header.jsx
 │   │   ├── Home.jsx
 │   │   ├── ProductList.jsx
 │   │   ├── ProductItem.jsx
 │   │   ├── ProductDetails.jsx
 │   │   ├── Cart.jsx
 │   │   ├── CartItem.jsx
 │   │   ├── Checkout.jsx
 │   │   ├── NotFound.jsx
 │   │   ├── LoadingSpinner.jsx
 │   │   ├── Footer.jsx
 │   │   ├── Ordersuccess.jsx
 │   │   ├── UserRedirect.jsx
 │   │   └── ErrorMessage.jsx
 │   │
 │   ├── redux/
 │   │   ├── store.js
 │   │   ├── productSlice.js
 │   │   └── cartSlice.js
 │   │
 │   ├── utils/
 │   │   ├── CartApis.js
 │   │   ├── userApi.js
 │   │   └── useProducts.js
 │   │
 │   ├── App.jsx
 │   └── main.jsx
 │
 ├── package.json
 ├── vite.config.js
 ├── index.html
 └── README.md
```
---

## 🧭 API Endpoints

### 🔐 User Routes
| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | `/register` | Register a new user  |
| POST   | `/Login`    | Log in existing user |

### 📦 Product Routes
| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | `/api/products`        | Fetch all products    |
| GET    | `/api/products/:id`    | Fetch product by ID   |

### 🛒 Cart Routes
| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/cart/`          | Get user’s cart items       |
| POST   | `/api/cart/`          | Add new item to cart        |
| PUT    | `/api/cart/`          | Update cart item quantity   |
| DELETE | `/api/cart/`          | Remove specific item from cart |
| DELETE | `/api/cart/clear`     | Clear entire cart           |


---

---
## 🚀 How the Project Works

- Frontend interacts with the backend REST APIs via `fetch()` and Redux actions.  
- Authentication tokens (**JWT**) are stored in `localStorage` after login.  
- Protected routes check token validity before fetching data.  
- **MongoDB** stores all user, product, and cart information.  
- Toast messages provide real-time feedback for all user actions.  

---

## 🔐 Environment Variables (Backend)

| Variable     | Description                        |
| ------------- | ---------------------------------- |
| `JWT_SECRET`  | Secret key for token generation    |
| `JWT_EXPIRE`  | Token expiration time              |

---

## 🧠 Future Enhancements

- Integrate **Payment Gateway** (Stripe/Razorpay)  
- Add **Order Management System**  
- Implement **Admin Dashboard** for inventory control  
- Add **Search & Filter** functionality for products  
- Enable **Wishlist** functionality  


---

## 📸 Project Screenshots 


- Homepage  

![Homepage](/src/assets/screenshots/Homepage.png)

- Login Page

![Login Page](/src/assets/screenshots/image-5.png)

- Signup Page 

![Signup Page](/src/assets/screenshots/image-6.png)

- Products Page 

![Products Page](/src/assets/screenshots/products.png)


- Product Details Page  

![Product Details Page](/src/assets/screenshots/image.png)

- Cart Page  

![Cart Page](/src/assets/screenshots/image-1.png)

- Checkout Page  

![Checkout Page-1](/src/assets/screenshots/image-2.png)

![Checkout Page-2](/src/assets/screenshots/image-3.png)

- Order Success Page  

![Order Success Page](/src/assets/screenshots/image-4.png)

---
## 📸 API Testing Screenshots

## User API`s

- POST `/register`  Register a new user  

![User Register API](/src/assets/screenshots/image-7.png)

- POST  `/Login` Log in existing user 

![User Login API](/src/assets/screenshots/image-8.png)


## Product API`s

- GET `/api/products` Fetch all products

![Products API](/src/assets/screenshots/image-9.png)

- GET `/api/products/1` Fetch a product By Id

![Product BY ID API ](/src/assets/screenshots/image-10.png)


## Cart API`s

- GET `/api/cart` Fetch all cart items of a user

![Cart Fetch ITEMS API](/src/assets/screenshots/image-11.png)

- POST `/api/cart` Add an item to the cart

![Cart Add Item API](/src/assets/screenshots/image-12.png)

- PUT `/api/cart` Update quantity of an item

![Cart update item API](/src/assets/screenshots/image-13.png)

- DELETE `/api/cart` Delete a specific item in cart

![Delete an item API](/src/assets/screenshots/image-14.png)

- DELETE `/api/cart/clear` Delete all items in the cart

![Clear Cart API](/src/assets/screenshots/image-15.png)

---

## 🔗 GitHub Repository  
👉 [Click Here to View Repository](https://github.com/Rathan97/shoppy-globe-ecommerce-application)

---

## 🏁 Conclusion  
ShoppyGlobe demonstrates a complete **MERN-based e-commerce application** with JWT authentication, responsive design, and robust state management.  
It highlights a clean and modular architecture, making it scalable for real-world applications.  
