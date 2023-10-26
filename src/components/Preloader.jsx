import React from "react";
import { ImSpinner9 } from "react-icons/im";
function Loading() {
  return (
    <div className="bg-black fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-95 z-50">
      <ImSpinner9 size={70} className="animate-spin" color="green"/>
      </div>
  );
}

export default Loading;
