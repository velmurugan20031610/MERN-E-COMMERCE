import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { firebaseSignup } from "../../service/firebaseService";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Firebase Signup
      const cred = await firebaseSignup({
        email: form.email,
        password: form.password,
      });

      // 2️⃣ Get token
      const token = await cred.user.getIdToken();
      localStorage.setItem("token", token);

      // 3️⃣ Register in Backend
      await axios.post(
        "http://localhost:8080/api/user/register",
        {
          uid: cred.user.uid,
          email: form.email,
          name: form.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
