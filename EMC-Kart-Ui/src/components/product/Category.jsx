import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { makeAuthenticatedRequest } from "../../service/axiosService";

const Category = () => {
  const { category } = useParams();
  const { searchText } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    makeAuthenticatedRequest("/api/product", "GET") // ✅ FIXED SLASH
      .then((res) => {
        const filteredByCategory = res.data.filter(
          (p) =>
            p.category?.toLowerCase() === category.toLowerCase() // ✅ FIX
        );
        setProducts(filteredByCategory);
      })
      .catch((err) => console.error("Category fetch error:", err));
  }, [category]);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6">
      {filtered.length === 0 ? (
        <p className="text-gray-500 mt-10">No products found</p>
      ) : (
        filtered.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))
      )}
    </div>
  );
};

export default Category;
