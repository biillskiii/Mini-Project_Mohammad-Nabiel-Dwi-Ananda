import React from "react";

const Footer = () => {
  return (
    <footer class="w-full p-4 bg-green-600 md:p-8 lg:p-10 dark:bg-gray-800 shadow-md">
      <div class="mx-auto w-full-xl text-center">
        <a
          href="#"
          class="flex justify-center items-center text-2xl font-semibold text-white dark:text-white"
        >
          Gadget Store
        </a>
        <p class="my-6 text-white dark:text-gray-400">
          Open-source library of over 400+ web components and interactive
          elements built for better web.
        </p>
        <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Premium
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6 ">
              Campaigns
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Blog
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Affiliate Program
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span class="text-sm text-white sm:text-center dark:text-gray-400">
          © 2021-2022{" "}
          <a href="#" class="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
