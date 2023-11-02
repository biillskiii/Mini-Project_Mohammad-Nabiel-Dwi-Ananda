import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Button";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../services/product";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const Card = ({ id, title, rating, category, price, images, isLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);

  const handleBuyClick = () => {
    if (isLoggedIn) {
      dispatch(addToCart({ id, title, rating, category, price, images }));
      Swal.fire(
        "Produk berhasil ditambahkan",
        "You clicked the button!",
        "success"
      );
    } else {
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
    handleOpen();
  };

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="w-80 h-auto bg-white rounded-md shadow-2xl grid grid-cols-1 gap-y-1 p-4">
      {loading && (
        <div className="w-full h-60 bg-gray-600 flex justify-center items-center animate-pulse">
          <FaSpinner size={20} className="animate-spin" />
        </div>
      )}
      <img
        src={images ? images : "https://placehold.co/160"}
        className={`w-auto h-60 mx-auto ${loading ? "hidden" : "block"}`}
        alt={title}
        onLoad={handleImageLoaded}
      />
      <h2 className="font-semibold text-lg overflow-hidden">{title}</h2>
      <div className="my-3">
        <p className="font-medium text-sm flex flex-row items-center gap-x-1">
          Rating : <AiFillStar color="gold" />{rating} 
        </p>
        <p className="font-medium text-sm">Category : {category}</p>
      </div>

      <div className="flex flex-row">
        <p className="font-semibold text-base flex justify-center items-center">
          Price: {`$ ${price}`}
        </p>
        <Btn
          id={id}
          label={"Add cart"}
          className="flex flex-col"
          onClick={handleBuyClick}
        />
      </div>
    </div>
  );
};

export default Card;
