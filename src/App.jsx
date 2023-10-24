import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Main from "../src/pages/Home";
import Login from "../src/pages/Login";
import Chat from "../src/pages/Chat";
import Dashboard from "../src/Admin/Dashboard";
import Cart from "../src/pages/Cart";
import Invoice from "./pages/Invoice";
import Loading from "../src/components/Preloader";

export default function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? ( 
        <Loading />
      ) : (
        <Routes>
          <Route path="/chatbot" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Main />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route
            path="/admin/*"
            element={
              isLoggedIn === "admin" ? <Dashboard /> : <Navigate to="/login" />
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}
