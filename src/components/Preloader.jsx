import React from "react";
import Logo from "../assets/logo.png"

function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-transparent bg-opacity-20 z-50">
      <img width={90} src={Logo}></img>
      <p className="text-green-500 font-semibold text-2xl">Loading...</p>
      </div>
  );
}

export default Loading;
