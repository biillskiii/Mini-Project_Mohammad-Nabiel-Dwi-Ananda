import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productAdmin";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ username, onLogout }) => {
  return (
    <div className="fixed h-screen w-48 bg-gray-800 text-white">
      <div className="py-4 px-2">
        <p className="block p-2">Dashboard</p>
        <button className="p-2 hover-bg-gray-600" onClick={onLogout}>
          Logout
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
    price: "",
    category: "",
    images: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const products = useSelector((state) => state.productAdmin.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setProduct({
        ...product,
        images: files[0],
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
      price: product.price,
      category: product.category,
      images: product.images,
    });

    setIsEditFormOpen(true);
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const updatedProduct = {
          id: editingProductId,
          title: editProductData.title,
          price: editProductData.price,
          category: editProductData.category,
          images: editProductData.images,
        };
        const response = await dispatch(updateProduct(updatedProduct));
        console.log("Product updated:", response.payload);

        setEditingProductId(null);
        setEditProductData(null);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update data:", error);
      }
    } else {
      try {
        const newProduct = {
          title: product.title,
          price: parseFloat(product.price),
          category: product.category,
          images: product.images,
        };
        const response = await dispatch(createProduct(newProduct));
        console.log("New product created:", response.payload);

        setProduct({
          title: "",
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

  const handleDelete = async (productId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmation) {
      try {
        const response = await dispatch(deleteProduct(productId));
        console.log("Product deleted:", response.payload);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Sidebar username={username} onLogout={handleLogout} />
      <main className="ml-48 p-4">
        <div className="flex justify-between items-center">
          <p className="p-2 font-bold text-xl">Hello, {username}</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
                  <td className="border p-2">{product.price}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">
                    {product.images && (
                      <img
                        src={product.images} // Make sure the property name matches your API response
                        alt="Product"
                        style={{ maxWidth: "100px", height: "auto" }}
                        className="m-auto img-fluid"
                      />
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
                      onClick={() => handleDelete(product.id)}
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
          <div className="bg-white p-4 rounded">
            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
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
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block font-semibold">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="images" className="block font-semibold">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Create
              </button>
            </form>
            <button
              onClick={closeCreateModal}
              className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isEditFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 rounded">
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
                <input
                  type="text"
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
                />
              </div>
              <div className="mb-4">
                <label htmlFor="images" className="block font-semibold">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-100"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
