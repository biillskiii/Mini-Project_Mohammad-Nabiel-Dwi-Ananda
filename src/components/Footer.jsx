import React from "react";
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="w-full bg-green-600 p-8 dark:bg-gray-800 shadow-md">
      <div className="mx-auto w-full-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-2xl font-semibold text-white dark:text-white"
        >
          Gadget Store
        </a>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white gap-x-5 mt-5">
          <li>
            <a href="https://instagram.com/biillskiii" className="mr-4 hover:underline md:mr-6 ">
              <BsInstagram size={30} color="white"/>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/mohammad-nabiel/" className="mr-4 hover:underline md:mr-6">
              <BsLinkedin size={30} color="white"/>
            </a>
          </li>
          <li>
            <a href="https://github.com/biillskiii" className="mr-4 hover:underline md:mr-6">
              <BsGithub size={30} color="white"/>
            </a>
          </li>
        </ul>
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2023 Frontend junior - Nabiel
        </span>
      </div>
    </footer>
  );
};

export default Footer;
