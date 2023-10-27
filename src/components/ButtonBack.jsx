import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const Button = () => {
  const navigate = useNavigate()
  return (
    <button
    className="flex items-center bg-white shadow-md w-24 mt-5 py-2 ml-5 rounded-md px-3 gap-x-3 font-semibold"
    onClick={() => navigate("/")}
  >
    <AiOutlineArrowLeft size={32} color="green" /> Back
  </button>
  )
}

export default Button