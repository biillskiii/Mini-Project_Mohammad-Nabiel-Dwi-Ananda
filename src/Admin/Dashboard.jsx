import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product";
import { useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import { PiSidebarSimpleFill } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login")
  }
  return (
    <div
      className={`fixed h-screen w-48 bg-black text-white z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-48 "
      }`}
    >
      <div className="py-4 px-2 mt-10">
        <button
          onClick={navigate("/admin/dashboard")}
          className="w-full p-2 bg-green-600 text-left rounded-md"
        >
          Dashboard
        </button>
        <button
          className="w-full text-left mt-5 p-2 bg-red-600 flex items-center gap-x-1 rounded-md"
          onClick={handleLogout}
        >
          <BiLogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

const Admin = () => {
  const dispatch = useDispatch();
  const username = "Admin";
  const navigate = useNavigate();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    rating: "",
    price: "",
    category: "",
    images: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.productCart.products);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    dispatch(getProducts());
    setIsLoading(false);
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (isEditing) {
      setEditProductData({
        ...editProductData,
        [name]: value,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditProductData({
      title: product.title,
      rating: product.rating,
      price: product.price,
      category: product.category,
      images: product.images,
    });

    setIsEditFormOpen(true);
    setIsEditing(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirmed = async (productId) => {
    try {
      const response = await dispatch(deleteProduct(productId));
      console.log("Product deleted:", response.payload);
      closeDeleteModal();
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeModal = () => {
    setCreateModalOpen(false);
    setIsEditFormOpen(false);
  };
  const generateRandomRating = () => {
    return (Math.random() * (5 - 1) + 1).toFixed(1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const updatedProduct = {
          id: editingProductId,
          title: editProductData.title,
          rating: editProductData.rating,
          price: editProductData.price,
          category: editProductData.category,
          images: editProductData.images,
        };
        const response = await dispatch(updateProduct(updatedProduct));
        console.log("Product updated:", response.payload);

        setEditingProductId(null);
        setEditProductData(null);
        setIsEditing(false);
        setIsEditFormOpen(false);
      } catch (error) {
        console.error("Failed to update data:", error);
      }
    } else {
      try {
        const newProduct = {
          title: product.title,
          rating: generateRandomRating(),
          price: parseFloat(product.price),
          category: product.category,
          images: product.images,
        };
        const response = await dispatch(createProduct(newProduct));
        console.log("New product created:", response.payload);

        setProduct({
          title: "",
          rating: "",
          price: "",
          category: "",
          images: null,
        });
        setCreateModalOpen(false);
      } catch (error) {
        console.error("Failed to create product:", error);
      }
    }
  };

  return (
    <div
      className={`relative bg-white min-h-screen ${
        isSidebarOpen ? "ml-0" : "ml--2"
      }`}
    >
      <button onClick={toggleSidebar} className="fixed top-5 left-5 z-20">
        <AiFillCloseCircle size={20} color="white" />
      </button>

      <button
        onClick={toggleSidebar}
        className={`absolute top-5 left-5 z-20 ${
          isSidebarOpen
            ? "transform -translate-x-10"
            : "transform translate-x-0"
        } transition-transform`}
      >
        <PiSidebarSimpleFill size={30} color="black" />
      </button>

      <Sidebar
        username={username}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
      />
      <main className="p-4">
        <div className="flex justify-between items-center">
          <p className="ml-10 font-bold text-xl">Hello, {username}</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-gree-900"
          >
            Create Product
          </button>
        </div>

        <div className="relative overflow-x-auto mt-10">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700"
                  key={product.id}
                >
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{product.title}</td>
                  <td className="border p-2">{product.rating}</td>
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">
                    {isLoading ? (
                      <div>
                        <ImSpinner6 className="animate-spin" size={30} />
                      </div>
                    ) : (
                      <div>
                        {product.images && (
                          <img
                            src={product.images}
                            alt="Product"
                            style={{ maxWidth: "100px", height: "auto" }}
                            className="m-auto img-fluid"
                          />
                        )}
                      </div>
                    )}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-indigo-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    {" | "}
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {isCreateModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-5/12 bg-white p-4 rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Create Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  placeholder="Name of product"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-semibold">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  placeholder="$"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="block font-semibold">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  required
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptop</option>
                  <option value="Aksesoris">Aksesoris</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="images" className="block font-semibold">
                  Image URL
                </label>
                <input
                  type="text"
                  id="images"
                  name="images"
                  value={product.images}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  placeholder="https://imageproduct.jpg"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Create
              </button>
              <button
                onClick={closeModal}
                className="mt-4 ml-5 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {isEditFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-5/12 bg-white p-4 rounded">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editProductData.title}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md bg-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block font-semibold">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editProductData.price}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md bg-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block font-semibold">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={editProductData.category}
                  onChange={(e) =>
                    setEditProductData({
                      ...editProductData,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 rounded-md bg-gray-100"
                  required
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="smartphones">Smartphones</option>
                  <option value="laptops">Laptop</option>
                  <option value="Aksesoris">Aksesoris</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="images" className="block font-semibold">
                  Image URL
                </label>
                <input
                  type="images"
                  id="images"
                  name="images"
                  value={isEditing ? editProductData.images : product.images}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  placeholder="https://imageproduct.jpg"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update
              </button>
              <button
                onClick={closeModal}
                className="mt-4 ml-5 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded">
            <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleDeleteConfirmed(productToDelete.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="ml-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
