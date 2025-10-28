
# 🛍️ ShoppyGlobe

## 🧩 Introduction  
ShoppyGlobe is a fully responsive **e-commerce web application** built using the **React, Redux and Tailwind**.  
It allows users to browse products, view details, add to cart, and place orders seamlessly.  
The app is optimized for all devices with smooth UI and performance enhancements.

---

## ✨ Features  
- 💻 **Responsive Design** – Works perfectly on desktop, tablet, and mobile.  
- 🛒 **Cart Management** – Add, remove, and update products dynamically.  
- 📦 **Product Details Page** – Includes ratings, description, and pricing.  
- ⚙️ **Checkout Form Validation** – Ensures accurate user input.  
- ⏳ **Lazy Loading & Suspense** – Improves performance and speed.  
- ⚡ **API Integration** – Fetches data from DummyJSON API.  
- 💬 **Error Handling** – Displays user-friendly error messages for network/API issues.  
- ⭐ **Skeleton & Spinner** – Shows smooth loading experience.  
- 🎨 **Font Awesome Icons** – Clean and modern icon usage.  

---

## 🛠️ Technologies Used  
- **Frontend:** React, Tailwind CSS, React Router, Redux Toolkit, Font Awesome  
- **API:** DummyJSON  
- **Build Tools:** Vite 
- **Version Control:** Git & GitHub  

---

## ⚙️ Installation Process  



## Clone the repository
```bash
git clone https://github.com/Rathan97/shoppy-globe-ecommerce-application.git
```


## Navigate to the project directory

```bash
cd shoppy-globe
```

## Install dependencies

```bash
npm install
```

## Start the development server
```
npm run dev   
```


## Open in your browser
```
http://localhost:5173 
```

---

## 📂 Folder Structure  
```
src/
 ├── components/
 │   ├── Header.jsx
 │   ├── Home.jsx
 │   ├── ProductList.jsx
 │   ├── ProductItem.jsx
 │   ├── ProductDetails.jsx
 │   ├── Cart.jsx
 │   ├── CartItem.jsx
 │   ├── Checkout.jsx
 │   ├── NotFound.jsx
 │   ├── LoadingSpinner.jsx
 │   ├── Footer.jsx
 │   ├── Ordersuccess.jsx
 │   └── ErrorMessage.jsx
 │      
 │
 ├── redux/
 │   ├── store.js
 │   ├── productSlice.js
 │   └── cartSlice.js
 │
 ├── utils/
 │   └── useProducts.js
 │
 ├── App.jsx
 └── main.jsx

```

---

## 🚀 How the Project Works  
- Products are fetched dynamically from **DummyJSON API** using a custom hook.  
- Lazy loading ensures images load as the user scrolls.  
- The cart icon updates in real-time as items are added or removed.  
- During checkout, input fields are validated for accuracy.  
- On successful order placement, the cart is cleared automatically.  
- The user is redirected to a success page with confirmation message.  

---

## 🔗 GitHub Repository  
👉 [Click Here to View Repository](https://github.com/Rathan97/shoppy-globe-ecommerce-application)

---

## 🏁 Conclusion  
ShoppyGlobe demonstrates proficiency in **React, Redux, and Tailwind CSS** while showcasing an end-to-end workflow for a scalable e-commerce platform.  
It focuses on **performance, responsiveness, and clean code architecture** for a real-world project experience.
