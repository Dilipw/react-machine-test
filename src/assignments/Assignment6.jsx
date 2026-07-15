import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";
const ITEMS_PER_PAGE = 5;

function Assignment6() {
  const [allProducts, setAllProducts] = useState([]); // master list
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({ title: "", price: "", category: "" });
  const [editId, setEditId] = useState(null);

  // ---------- NOTIFICATION ----------
  const [notify, setNotify] = useState({ message: "", type: "" });

  const showNotify = (message, type = "success") => {
    setNotify({ message, type });
    setTimeout(() => setNotify({ message: "", type: "" }), 2500);
  };

  // ---------- READ (fetch all) ----------
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}?limit=100`);
      setAllProducts(res.data.products);
    } catch (err) {
      console.log("Error fetching products:", err);
      showNotify("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------- LIVE FILTER ----------
  const filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // ---------- CREATE ----------
  const handleAdd = async () => {
    if (!form.title || !form.price || !form.category) {
      showNotify("Please fill all fields", "error");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/add`, {
        title: form.title,
        price: form.price,
        category: form.category,
      });
      setAllProducts([res.data, ...allProducts]);
      setForm({ title: "", price: "", category: "" });
      showNotify("Product added successfully", "success");
    } catch (err) {
      console.log("Error adding product:", err);
      showNotify("Failed to add product", "error");
    }
  };

  // ---------- UPDATE ----------
  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/${editId}`, {
        title: form.title,
        price: form.price,
        category: form.category,
      });
      const updated = allProducts.map((p) =>
        p.id === editId ? { ...p, ...res.data } : p
      );
      setAllProducts(updated);
      setEditId(null);
      setForm({ title: "", price: "", category: "" });
      showNotify("Product updated successfully", "success");
    } catch (err) {
      console.log("Error updating product:", err);
      showNotify("Failed to update product", "error");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ title: "", price: "", category: "" });
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setAllProducts(allProducts.filter((p) => p.id !== id));
      showNotify("Product deleted successfully", "success");
    } catch (err) {
      console.log("Error deleting product:", err);
      showNotify("Failed to delete product", "error");
    }
  };

  return (
    <div className="container">
      <h1>Assignment 6 - CRUD with DummyJSON</h1>

      {/* Notification */}
      {notify.message && (
        <div className={`notify ${notify.type}`}>{notify.message}</div>
      )}

      {/* Live Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search product by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch("")}>Clear</button>
      </div>

      {/* Form */}
      <div className="form-box">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {editId ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.price}</td>
                    <td>{p.category}</td>
                    <td>
                      <button onClick={() => handleEdit(p)}>Edit</button>
                      <button onClick={() => handleDelete(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Assignment6;