import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Contact from "./pages/Contact";
import Create from "./pages/Create";
import Cart from './components/Cart/cart.component'
import Billing from './components/Billing/billing.component'
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import StoreOrder from './components/adminorders/order.component'
import ProductListing from './components/ProductListing/productlisting.component';
import Update from './components/Update/update.component';
import ProductDetails from './components/ProductListing/productDetails';
import Checkout from './components/Checkout/checkout';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
          <Route path="contact" element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="billing" element={<Billing />} />
          <Route path="create" element={<Create />} />

          <Route path="productlisting" element={<ProductListing />} />
          <Route path ="product-details/:id/:tag" element={<ProductDetails/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="update" element={<Update />} />
          <Route path="allorders" element= { <StoreOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
