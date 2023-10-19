import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "./Button";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

const Card = ({ id, title, rating, category, price, images, isLoggedIn }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);

  const handleBuyClick = () => {
    if (isLoggedIn === "true") {
      handleOpen();
    } else {
      handleLoginRequired();
    }
  };

  const handleLoginRequired = () => {
    handleOpen();
  };
  const handleLogin = () => {
    // Navigasi ke halaman "/login"
    navigate("/login");
    handleOpen();
  };
  return (
    <div className="w-80 h-auto bg-white rounded-md shadow-md grid grid-cols-1 gap-y-1 p-4">
      <img
        src={images ? images : "https://placehold.co/160"}
        className="w-auto h-60 mx-auto"
        alt={title}
      />
      <h2 className="font-semibold text-lg overflow-hidden">{title}</h2>
      <div className="my-3">
        <p className="font-medium text-sm">Rating : {rating}</p>
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
        <Dialog open={open} handler={handleOpen}>
          {isLoggedIn === "true" ? (
            <>
              <DialogHeader>Selamat Berbelanja</DialogHeader>
            </>
          ) : (
            <>
              <DialogHeader>Login dulu gan</DialogHeader>
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
            </>
          )}
        </Dialog>
      )}
    </div>
  );
};

export default Card;
