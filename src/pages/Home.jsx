import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../services/product";
import Card from "../components/Card";
import Cart from "./Cart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Category from "../components/Category";
import CarrouselImage from "../assets/carrousel.png";
import { MdDiscount } from "react-icons/md";
import { addToCart } from "../services/product";
import Loading from "../components/Preloader"; // Import the Loading component

export default function Home() {
  const dispatch = useDispatch();
  const newProduct = useSelector((state) => state.productCart.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    dispatch(getProducts()).then(() => {
      setIsLoading(false); 
    });
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filteredProducts = newProduct.filter((newProduct) =>
      newProduct.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const sortProducts = (newProduct) => {
    if (sortOrder === "AZ") {
      return [...newProduct].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "ZA") {
      return [...newProduct].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === "ratingAsc") {
      return [...newProduct].sort((a, b) => a.rating - b.rating);
    } else if (sortOrder === "ratingDesc") {
      return [...newProduct].sort((a, b) => b.rating - a.rating);
    } else if (sortOrder === "priceAsc") {
      return [...newProduct].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceDesc") {
      return [...newProduct].sort((a, b) => b.price - a.price);
    } else {
      return newProduct;
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const sortedProducts = sortProducts(
    searchResults.length > 0 ? searchResults : newProduct
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={cart.length} handleOpen={() => setIsOpen(true)} />
      {isOpen && (
        <Cart
          product={cart}
          deleteItem={handleDelete}
          increment={handleIncrement}
          decrement={handleDecrement}
        />
      )}
      <div className="rounded-xl w-11/12 flex flex-col justify-center items-center ml-5 mt-10 relative lg:ml-14">
        <img src={CarrouselImage} className="w-full" alt="Carousel" />
        <div className="absolute w-full flex flex-col justify-center text-white  px-4 lg:ml-32">
          <h1 className="text-xl font-bold text-left mt-5  lg:text-start lg:text-4xl lg:mt-10">
            MACBOOK M1 PRO
          </h1>
          <p className="text-xl font-semibold flex flex-row items-center gap-x-2  justify-start lg:justify-start">
            Discount 50% <MdDiscount size={15} />
          </p>
          <p className="text-sm font-medium mb-5 text-start lg:text-start">
            00.00 WIB - 12.00 WIB
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Category
          onSelectCategory={handleCategorySelect}
          onSort={handleSort}
          onSearch={handleSearch}
        />
      </div>

      <div className="w-full h-40 flex flex-wrap justify-center gap-x-5 gap-y-10 mt-5">
        {isLoading ? (
          <Loading />
        ) : searchTerm === "" ? (
          sortedProducts.map((product, index) => {
            if (
              selectedCategory === "All" ||
              product.category === selectedCategory
            ) {
              return (
                <Card
                  key={index}
                  id={product.id}
                  title={product.title}
                  rating={product.rating}
                  category={product.category}
                  price={product.price}
                  images={product.images}
                  isLoggedIn={isLoggedIn}
                />
              );
            } else {
              return null;
            }
          })
        ) : (
          sortedProducts.map((product, index) => {
            if (
              selectedCategory === "All" ||
              product.category === selectedCategory
            ) {
              return (
                <Card
                  key={index}
                  id={product.id}
                  title={product.title}
                  rating={product.rating}
                  category={product.categorye}
                  price={product.price}
                  images={product.images}
                  isLoggedIn={isLoggedIn}
                />
              );
            } else {
              return null;
            }
          })
        )}
        <Footer />
      </div>
    </div>
  );
}
