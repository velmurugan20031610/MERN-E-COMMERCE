import { useSelector, useDispatch } from "react-redux";
import { clearUser, setSearchText } from "../../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useState } from "react";

const Navbar = () => {
  const { userData, checkoutProducts, searchText } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 px-4 py-3">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="text-white font-bold text-lg">
          EMCKart
        </Link>

        {/* MOBILE MENU ICON */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          <MenuOutlined />
        </button>

        {/* DESKTOP MENU */}
        {userData && (
          <div className="hidden md:flex items-center gap-6">
            <input
              type="text"
              value={searchText}
              onChange={(e) => dispatch(setSearchText(e.target.value))}
              placeholder="Search..."
              className="px-3 py-1 rounded"
            />

            <Badge count={checkoutProducts.length} showZero>
              <ShoppingCartOutlined
                className="text-white text-xl cursor-pointer"
                onClick={() => navigate("/checkout")}
              />
            </Badge>

            {userData.isAdmin && (
              <button
                onClick={() => navigate("/productUpload")}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Add Product
              </button>
            )}

            <button
              onClick={() => dispatch(clearUser())}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP CATEGORY LINKS */}
      {userData && (
        <div className="hidden md:flex justify-center gap-6 mt-3 text-white font-semibold">
          <Link to="/">All</Link>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/mens">Mens</Link>
          <Link to="/category/womens">Womens</Link>
          <Link to="/category/shoes">Shoes</Link>
          <Link to="/category/dress">Dress</Link>
        </div>
      )}

      {/* MOBILE DROPDOWN */}
      {open && userData && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          {/* CATEGORY LINKS */}
          <Link to="/" onClick={() => setOpen(false)} className="text-white">
            All
          </Link>
          <Link
            to="/category/electronics"
            onClick={() => setOpen(false)}
            className="text-white"
          >
            Electronics
          </Link>
          <Link
            to="/category/mens"
            onClick={() => setOpen(false)}
            className="text-white"
          >
            Mens
          </Link>
          <Link
            to="/category/womens"
            onClick={() => setOpen(false)}
            className="text-white"
          >
            Womens
          </Link>
          <Link
            to="/category/shoes"
            onClick={() => setOpen(false)}
            className="text-white"
          >
            Shoes
          </Link>
          <Link
            to="/category/dress"
            onClick={() => setOpen(false)}
            className="text-white"
          >
            Dress
          </Link>

          {/* SEARCH */}
          <input
            type="text"
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            placeholder="Search..."
            className="px-3 py-2 rounded"
          />

          {/* CART */}
          <button
            onClick={() => {
              setOpen(false);
              navigate("/checkout");
            }}
            className="bg-gray-700 text-white py-2 rounded"
          >
            Cart ({checkoutProducts.length})
          </button>

          {/* ADMIN */}
          {userData.isAdmin && (
            <button
              onClick={() => {
                setOpen(false);
                navigate("/productUpload");
              }}
              className="bg-blue-600 text-white py-2 rounded"
            >
              Add Product
            </button>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              setOpen(false);
              dispatch(clearUser());
            }}
            className="bg-red-600 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
