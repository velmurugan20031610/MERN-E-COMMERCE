import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/productStore";
import { Alert } from "antd";

const ProductUpload = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "", // ✅
  });

  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [successFlag, setSuccessFlag] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "emckart_unsigned");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvoqthbls/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    let imageUrl = "";

    if (productImage) {
      imageUrl = await uploadImageToCloudinary(productImage);
    }

    dispatch(
      createProduct({
        ...formData,
        imagePath: imageUrl,
      })
    ).then(() => {
      setSuccessFlag(true);
      setFormData({ title: "", description: "", price: "", category: "" });
      setProductImage(null);
      setPreviewImage(null);
    });
  };

  return (
    <div className="bg-white w-96 mx-auto mt-20 p-6 rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4">Add Product</h2>

      {successFlag && <Alert message="Product added" type="success" showIcon />}
      {error && <Alert message="Upload failed" type="error" showIcon />}

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      />

      {/* ✅ CATEGORY */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
      >
        <option value="">Select Category</option>
        <option value="dress">Dress</option>
        <option value="electronics">Electronics</option>
        <option value="shoes">Shoes</option>
      </select>

      <input type="file" onChange={handleImageChange} className="mt-3" />

      {previewImage && (
        <img src={previewImage} className="mt-3 rounded" />
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white w-full mt-4 p-2 rounded"
      >
        Upload Product
      </button>
    </div>
  );
};

export default ProductUpload;
