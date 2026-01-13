import { useDispatch } from "react-redux";
import { addProductTOCheckout } from "../../store/userStore";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  return (
    <div className="border p-4 w-64 shadow rounded">
      <img
        src={product.imagePath || "https://via.placeholder.com/300"}
        alt={product.title}
        className="h-40  object-coverh-36 sm:h-40 md:h-48 w-full object-cover rounded"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300";
        }}
      />

      <h3 className="font-bold mt-2">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold">₹{product.price}</p>

      <button
        onClick={() => dispatch(addProductTOCheckout(product))}
        className="bg-blue-600 text-white w-full mt-2 py-1 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
