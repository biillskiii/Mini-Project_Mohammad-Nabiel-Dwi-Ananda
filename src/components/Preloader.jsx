import React from "react";
import { CgSpinner } from "react-icons/cg";
function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-transparent bg-opacity-20 z-50">
      <CgSpinner size={70} className="animate-spin" color="green"/>
      </div>
  );
}

export default Loading;
