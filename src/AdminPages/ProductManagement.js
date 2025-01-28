import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    price: "",
    brand: "",
    size: "",
    description: "",
    image: "",
    quantity: "",
    discount: false,
    discount_price: "",
    additionalImages: [],
    colors: "",
  });

  const [showAddModal, setShowAddModal] = useState(false); // New state for Add Product modal
  const handleAddProduct = () => {
    setCurrentProduct({
      name: "",
      price: "",
      brand: "",
      size: "",
      description: "",
      image: "",
      quantity: "",
      discount: false,
      discount_price: "",
      additionalImages: [],
      colors: "",
      category: "",
    });
    setShowAddModal(true); // Open modal
  };

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };

    fetchTotalProducts();
  }, []);

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products?category=${category}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
    fetchProductsByCategory(category);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/products/${currentProduct._id}`,
        currentProduct
      );
      setShowEditModal(false);
      fetchProductsByCategory(category);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/products/${deleteProductId}`
      );
      setShowDeleteModal(false);
      fetchProductsByCategory(category);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox inputs
    if (type === "checkbox") {
      setCurrentProduct({
        ...currentProduct,
        [name]: checked,
      });
    } else {
      setCurrentProduct({
        ...currentProduct,
        [name]: value,
      });
    }
  };
  const handleSaveNewProduct = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, {
        name: currentProduct.name,
        brand: currentProduct.brand,
        size: currentProduct.size,
        price: currentProduct.price,
        discount: currentProduct.discount,
        discount_price: currentProduct.discount_price,
        description: currentProduct.description,
        image: currentProduct.image,
        additionalImages: currentProduct.additionalImages,
        color: currentProduct.color, // Single color as a string
        quantity: currentProduct.quantity,
        category: currentProduct.category,
      });
      setShowAddModal(false);
      fetchProductsByCategory(category); // Refresh product list after adding
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Management</h1>

      <div style={styles.productCountBox}>
        <h2>Total Products</h2>
        <p>{totalProducts}</p>
      </div>
      <Button
        variant="success"
        onClick={handleAddProduct}
        style={{ marginBottom: "15px" }}
      >
        Add New Product
      </Button>

      <div style={styles.buttonContainer}>
        <button
          style={category === "Frame" ? styles.activeButton : styles.button}
          onClick={() => handleCategoryClick("Frame")}
        >
          Frames
        </button>
        <button
          style={category === "Diecast" ? styles.activeButton : styles.button}
          onClick={() => handleCategoryClick("Diecast")}
        >
          Diecast
        </button>
        <button
          style={category === "Poster" ? styles.activeButton : styles.button}
          onClick={() => handleCategoryClick("Poster")}
        >
          Posters
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div style={styles.productGrid}>
        {products.length > 0
          ? products.map((product) => (
              <div key={product._id} style={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
                <div style={styles.iconContainer}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          : !loading && <p>No products available in this category.</p>}
      </div>
      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={currentProduct.category || ""}
                onChange={handleFieldChange}
              >
                <option value="">Select Category</option>
                <option value="Diecast">Diecast</option>
                <option value="Frame">Frame</option>
                <option value="Poster">Poster</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProductBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={currentProduct.brand}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductSize">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={currentProduct.size}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={currentProduct.price}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Check
                type="checkbox"
                name="discount"
                checked={currentProduct.discount}
                onChange={handleFieldChange}
              />
            </Form.Group>
            {currentProduct.discount && (
              <Form.Group controlId="formProductDiscountPrice">
                <Form.Label>Discount Price</Form.Label>
                <Form.Control
                  type="number"
                  name="discount_price"
                  value={currentProduct.discount_price || ""}
                  onChange={handleFieldChange}
                />
              </Form.Group>
            )}
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentProduct.description}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="image"
                value={currentProduct.image}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductAdditionalImages">
              <Form.Label>
                Additional Images (each URL on a new line)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="additionalImages"
                value={currentProduct.additionalImages.join("\n")} // Display new-line-separated URLs
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    additionalImages: e.target.value
                      .split("\n")
                      .map((url) => url.trim()), // Convert new-line-separated string into array
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                name="color"
                value={currentProduct.color} // Use a simple string for color
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={currentProduct.quantity}
                onChange={handleFieldChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNewProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={currentProduct.price}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={currentProduct.brand}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductSize">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  name="size"
                  value={currentProduct.size}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <ReactQuill
                  value={currentProduct.description || ""}
                  onChange={(value) =>
                    handleFieldChange({
                      target: { name: "description", value },
                    })
                  }
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }], // Header styles
                      ["bold", "italic", "underline"], // Text styles
                      [{ list: "ordered" }, { list: "bullet" }], // Lists
                      ["link", "image"], // Links and images
                      ["clean"], // Remove formatting
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "list",
                    "bullet",
                    "link",
                    "image",
                  ]}
                />
              </Form.Group>
              <Form.Group controlId="formProductImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="image"
                  value={currentProduct.image}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductAdditionalImages">
                <Form.Label>
                  Additional Images (each URL on a new line)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5} // Adjust rows to show more lines
                  name="additionalImages"
                  value={currentProduct.additionalImages.join("\n")} // Join array into new-line-separated string
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      additionalImages: e.target.value
                        .split("\n")
                        .map((url) => url.trim()), // Split by new line and trim whitespace
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formProductQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={currentProduct.quantity}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="discount"
                  checked={currentProduct.discount}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              {currentProduct.discount && (
                <Form.Group controlId="formProductDiscountPrice">
                  <Form.Label>Discount Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount_price"
                    value={currentProduct.discount_price || ""}
                    onChange={handleFieldChange}
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formProductSold">
                <Form.Label>Sold</Form.Label>
                <Form.Control
                  type="number"
                  name="sold"
                  value={currentProduct.sold}
                  onChange={handleFieldChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={currentProduct.category || ""}
                  onChange={handleFieldChange}
                >
                  <option value="">Select Category</option>
                  <option value="Diecast">Diecast</option>
                  <option value="Frame">Frame</option>
                  <option value="Poster">Poster</option>
                </Form.Control>
              </Form.Group>

              {/* Add more fields as needed */}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "20px",
  },
  productCountBox: {
    width: "250px",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column", // Align everything in a column
    marginBottom: "20px",
    alignItems: "center", // Center buttons horizontally
  },
  button: {
    border: "2px solid #ccc",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "0 10px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  activeButton: {
    border: "2px solid #000",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "0 10px",
    backgroundColor: "#000",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  productGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    width: "100%",
    maxHeight: "520px",
    overflowY: "auto",
  },
  productCard: {
    border: "1px solid #ddd",
    padding: "20px",
    width: "250px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
};

export default ProductManagement;
