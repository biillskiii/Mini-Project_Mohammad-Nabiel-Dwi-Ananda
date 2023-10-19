import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Navbar from "@/components/Navbar";
import SearchInput from "@/components/Search";
import Category from "@/components/Category";

export default function Main() {
  const [newProduct, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6527d572931d71583df17723.mockapi.io/products"
        );

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredProducts = newProduct.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div className="mt-10">
        <Category onSelectCategory={handleCategorySelect} />
      </div>
      <div className="w-full h-40 flex flex-wrap justify-center gap-x-5 gap-y-10 mt-5">
        {newProduct.map((product, index) => {
          if (
            selectedCategory === "All" ||
            product.category === selectedCategory
          ) {
            return (
              <Card
                key={index}
                id={product.id}
                title={product.title}
                price={product.price}
                rating={product.rating}
                category={product.category}
                images={product.images}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
}
