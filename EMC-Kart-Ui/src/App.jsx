import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/common/Navbar";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Product from "./components/product/Product";
import ProductUpload from "./components/product/ProductUpload";
import Checkout from "./components/product/Checkout";
import Final from "./components/common/Final";

function App() {
  const { userData } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={userData ? <Product /> : <Navigate to="/login" />}
        />

        {/* ✅ CATEGORY ROUTE (THIS WAS MISSING) */}
        <Route
          path="/category/:category"
          element={userData ? <Product /> : <Navigate to="/login" />}
        />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN ONLY */}
        <Route
          path="/productUpload"
          element={
            userData?.isAdmin ? <ProductUpload /> : <Navigate to="/" />
          }
        />

        {/* CART */}
        <Route
          path="/checkout"
          element={userData ? <Checkout /> : <Navigate to="/login" />}
        />

        {/* SUCCESS */}
        <Route path="/finalFun" element={<Final />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
