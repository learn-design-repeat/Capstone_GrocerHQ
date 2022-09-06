import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React from 'react';
import {Outlet} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Cart from './components/Cart/cart.component';
import Home from './pages/Home';

function App() {
  return (
    <>
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
    <Outlet />
    </>
  );
}

export default App;
