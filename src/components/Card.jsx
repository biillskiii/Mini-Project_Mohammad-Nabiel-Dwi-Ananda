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
      handleOpen();
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
    <div className="w-80 h-auto bg-white rounded-md shadow-md grid grid-cols-1 gap-y-1 p-4">
      {loading && (
        <div className="w-full h-60 bg-white-200 flex justify-center items-center animate-spin">
          <FaSpinner size={20} />
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
        <p className="font-medium text-sm flex flex-row items-center gap-x-2">
          Rating : {rating} <AiFillStar color="gold" />
        </p>
        <p className="font-medium text-sm">Category : {category}</p>
      </div>

      <div className="flex flex-row">
        <p className="font-semibold text-base flex justify-center items-center">
          Price: {`$ ${price}`}
        </p>
        <Btn
          id={id}
          label={"Buy"}
          className="flex flex-col"
          onClick={handleBuyClick}
        />
      </div>
      {open && (
        <Dialog open={open}>
          <DialogHeader>Login dulu kak</DialogHeader>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleLogin}>
              <span>Login</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default Card;
