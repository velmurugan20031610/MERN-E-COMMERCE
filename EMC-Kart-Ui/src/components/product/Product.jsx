import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { makeAuthenticatedRequest } from "../../service/axiosService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { searchText } = useSelector((state) => state.user);
  const { category } = useParams(); // 👈 category from URL

  useEffect(() => {
    makeAuthenticatedRequest("api/product", "GET")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ CATEGORY FILTER
  let filteredProducts = category
    ? products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      )
    : products;

  // ✅ SEARCH FILTER
  filteredProducts = filteredProducts.filter((p) =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found
        </p>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4
          "
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
