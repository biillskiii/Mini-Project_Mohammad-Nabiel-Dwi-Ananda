"use client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "@/pages/Home";
import Login from "@/pages/Login";
export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
