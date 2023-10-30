import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../src/pages/Home";
import Login from "../src/pages/Login";
import Chat from "../src/pages/Chat";
import Dashboard from "./Admin/Dashboard";
import Cart from "../src/pages/Cart";
import Invoice from "./pages/Invoice";

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chatbot" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Main />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
