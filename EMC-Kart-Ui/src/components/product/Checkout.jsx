import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCheckout } from "../../store/userStore";
import { makeAuthenticatedRequest } from "../../service/axiosService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkoutProducts } = useSelector((state) => state.user);

  if (checkoutProducts.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        🛒 Your cart is empty
      </div>
    );
  }

  const totalAmount = checkoutProducts.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  const handlePayment = async () => {
    try {
      const res = await makeAuthenticatedRequest(
        "api/product/checkoutProducts",
        "POST",
        { amount: totalAmount }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: res.data.data.amount,
        currency: "INR",
        order_id: res.data.data.id,
        handler: () => {
          navigate("/finalFun");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {checkoutProducts.map((p, index) => (
        <div
          key={index}
          className="flex justify-between items-center border p-3 mb-3 rounded"
        >
          <div className="flex items-center gap-4">
            <img
              src={p.imagePath}
              alt={p.title}
              className="h-16 w-16 object-cover rounded"
            />

            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-gray-600">₹{p.price}</p>
            </div>
          </div>

          <button
  onClick={() =>
    dispatch(removeProductFromCheckout(p._id))
  }
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Remove
</button>

        </div>
      ))}


      {/* TOTAL + BUY NOW */}
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h3 className="text-lg font-bold">Total: ₹{totalAmount}</h3>

        <button
          onClick={handlePayment}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
