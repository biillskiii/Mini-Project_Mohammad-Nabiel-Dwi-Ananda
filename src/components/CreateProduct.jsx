import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const [randomNumber, setRandom] = useState(null);
  const [productId, setProductId] = useState(1);
  const [productPrice, setProductPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productFreshness, setProductFreshness] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [language, setLanguage] = useState("en");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null); // Menyimpan produk yang akan diedit

  const article = {
    title: {
      id: "Buat Akun",
      en: "Create Account",
    },
    description: {
      id: "Di bawah ini adalah contoh formulir yang dibuat seluruhnya dengan kontrol formulir Bootstrap. Setiap grup formulir yang diperlukan memiliki status validasi yang dapat dipicu dengan mencoba mengirimkan formulir tanpa menyelesaikannya.",
      en: "Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.",
    },
    detail: {
      id: "Detail Produk",
      en: "Detail Product",
    },
    nameProduct: {
      id: "Nama Produk",
      en: "Product Name",
    },
    categoryProduct: {
      id: "Pilih Kategori",
      en: "Select Category",
    },
    image: {
      id: "Gambar Produk",
      en: "Images of Product",
    },
    product: {
      id: "Kesegaran produk",
      en: "Product Freshness",
    },
    desc: {
      id: "Deskripsi",
      en: "Description",
    },
    price: {
      id: "Harga",
      en: "Price",
    },
    contentCategory1: {
      id: "Pilih",
      en: "Choose",
    },
    contentCategory2: {
      id: "Kaos",
      en: "Cloths",
    },
    contentCategory3: {
      id: "Baju",
      en: "T-Shirt",
    },
    radioContent1: {
      id: "Barang baru",
      en: "Brand new",
    },
    radioContent2: {
      id: "Barang bekas",
      en: "Second hand",
    },
    radioContent3: {
      id: "Diperbaharui",
      en: "Refurbished",
    },
    buttonRandom: {
      id: "Masukkan Harga Acak",
      en: "Input Price Random",
    },
    buttonSubmit: {
      id: "Kirim",
      en: "Submit",
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://6527d572931d71583df17723.mockapi.io/products`
        );

        setDataProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const postProductToApi = async () => {
    try {
      const response = await axios.post(
        "https://6527d572931d71583df17723.mockapi.io/products",
        {
          name: productName,
          category: productCategory,
          image: selectedImageFile,
          freshness: productFreshness,
          description: productDescription,
          price: productPrice,
        }
      );
      if (response.status === 201) {
        setDataProduct((prevData) => [...prevData, response.data]);
        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductFreshness("");
        setProductDescription("");
        setProductNameError("");
        Swal.fire("Success!", "Product added successfully.", "success");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      Swal.fire("Error!", "Failed to add product.", "error");
    }
  };

  const handleEditProduct = async () => {
    try {
      if (!productToEdit) {
        return; // Tidak ada produk yang akan diedit, keluar dari fungsi
      }

      // Pastikan productId sudah diatur dengan benar sesuai dengan produk yang ingin diubah
      const response = await axios.put(
        `https://6527d572931d71583df17723.mockapi.io/products${productToEdit.id}`,
        {
          name: productName,
          category: productCategory,
          image: selectedImageFile,
          freshness: productFreshness,
          description: productDescription,
          price: productPrice,
        }
      );

      if (response.status === 200) {
        const updatedDataProduct = dataProduct.map((product) =>
          product.id === productToEdit.id
            ? {
                ...product,
                name: productName,
                category: productCategory,
                image: selectedImageFile,
                freshness: productFreshness,
                description: productDescription,
                price: productPrice,
              }
            : product
        );

        setShowDeleteModal(false);
        setProductToEdit(null); // Setelah edit selesai, reset produk yang akan diedit
        Swal.fire("Success!", "Data berhasil diperbarui", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Gagal untuk memperbarui data", "error");
    }
  };

  const navigateToDetails = (productId, newProduct) => {
    navigate(`/details/${productId}`, { state: { product: newProduct } });
  };

  const generateNumberOnConsole = () => {
    const random = Math.floor(Math.random() * 500);
    setRandom(random);
    setProductPrice(`$ ${random}`);
  };

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `https://6527d572931d71583df17723.mockapi.io/products/${productIdToDelete}`
      );

      if (response.status === 200) {
        const updatedDataProduct = dataProduct.filter(
          (product) => product.id !== productIdToDelete
        );
        setDataProduct(updatedDataProduct);

        setShowDeleteModal(false);
        setProductIdToDelete("");
        Swal.fire("Success!", "Data berhasil dihapus", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Gagal untuk menghapus data", "error");
    }
  };

  const cancelDelete = () => {
    setProductIdToDelete("");
    setShowDeleteModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
    setSelectedImageFile(file);
  };

  return (
    <section>
      <div className="text-center mt-5">
        <h2 className="fw-semibold mt-4">{article.title[language]}</h2>
        <p className="text-center">{article.description[language]}</p>
        <div className="d-flex align-items-center justify-content-center text-xs">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              cursor: "pointer",
              background: "white",
            }}
            className="py-1 px-1 rounded-4 shadow-lg"
          >
            <div
              onClick={() => setLanguage("en")}
              className={`${
                language === "en" ? "text-primary" : "text-dark"
              } bg-transparent border-0 px-2`}
            >
              EN
            </div>
            <p className="m-0">/</p>
            <div
              onClick={() => setLanguage("id")}
              className={`${
                language === "id" ? "text-primary" : "text-dark"
              } bg-transparent border-0 px-2`}
            >
              ID
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 mx-auto">
        <form className="row justify-content-center">
          <Col lg={6}>
            <h5>
              <strong>{article.detail[language]}</strong>
            </h5>
            <Form.Group>
              <Form.Label htmlFor="productName">
                {article.nameProduct[language]}
              </Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
              {productNameError !== "" && (
                <div className="text-danger">{productNameError}</div>
              )}
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>{article.categoryProduct[language]}</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setProductCategory(e.target.value)}
                required
              >
                <option value="">{article.contentCategory1[language]}</option>
                <option value="Cloths">
                  {article.contentCategory2[language]}
                </option>
                <option value="T-Shirt">
                  {article.contentCategory3[language]}
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="image-product mb-3 mt-3">
              <Form.Label>{article.image[language]}</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>{article.product[language]}</Form.Label>
              <Form.Check
                type="radio"
                id="brand-new"
                label={article.radioContent1[language]}
                name="brand new"
                value="Brand new"
                onChange={(e) => setProductFreshness(e.target.value)}
                required
              />
              <Form.Check
                type="radio"
                id="second-hand"
                label={article.radioContent2[language]}
                name="second hand"
                value="Second hand"
                onChange={(e) => setProductFreshness(e.target.value)}
                required
              />
              <Form.Check
                type="radio"
                id="refurbished"
                label={article.radioContent3[language]}
                name="refurbished"
                value="Refurbished"
                onChange={(e) => setProductFreshness(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>{article.desc[language]}</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>{article.price[language]}</Form.Label>
              <Form.Control
                type="text"
                placeholder="$100"
                required
                value={randomNumber ? productPrice : ""}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>
            <Button
              onClick={generateNumberOnConsole}
              className="btn btn-warning col-lg-12 mt-3"
            >
              {article.buttonRandom[language]}
            </Button>
            <Button
              onClick={productToEdit ? handleEditProduct : postProductToApi}
              className="btn btn-primary col-lg-12 mt-3"
            >
              {productToEdit
                ? "Update" // Jika ada produk yang akan diedit
                : article.buttonSubmit[language]}
            </Button>
          </Col>
        </form>
      </div>
      <Container className="my-5 mx-auto">
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>No</th>
              <th>{article.nameProduct[language]}</th>
              <th>{article.categoryProduct[language]}</th>
              <th>{article.image[language]}</th>
              <th>{article.product[language]}</th>
              <th>{article.desc[language]}</th>
              <th>{article.price[language]}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {dataProduct.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.image}
                    alt={`Image for ${product.name}`}
                    style={{ maxWidth: "100px" }}
                  />
                </td>

                <td>{product.freshness}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setProductToEdit(product)} // Set produk yang akan diedit
                    className="mb-2 px-3"
                  >
                    Edit
                  </Button>
                  <br />
                  <Button
                    variant="info"
                    onClick={() => navigateToDetails(product.id, product)}
                    className="mb-2 px-3"
                  >
                    Detail
                  </Button>
                  <Button
                    className="mx-3"
                    variant="danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
}

export default Main;
