import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { firebaseLogin, signoutFirebaseUser } from "../service/firebaseService";

/**
 * Backend API base URL
 * Comes from Vercel Environment Variable
 * VITE_API_URL = https://emckart-api.onrender.com
 */
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const cred = await firebaseLogin({ email, password });

      const token = await cred.user.getIdToken();
      localStorage.setItem("token", token);

      const res = await axios.post(
        `${API_URL}/api/user/validate`,
        {
          uid: cred.user.uid,
          email: cred.user.email,
          name: cred.user.email.split("@")[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    checkoutProducts: [],
    searchText: "",
  },
  reducers: {
    clearUser: (state) => {
      state.userData = null;
      state.checkoutProducts = [];
      localStorage.removeItem("token");
      signoutFirebaseUser();
    },
    addProductTOCheckout: (state, action) => {
      state.checkoutProducts.push(action.payload);
    },
    removeProductFromCheckout: (state, action) => {
      state.checkoutProducts.splice(action.payload, 1);
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const {
  clearUser,
  addProductTOCheckout,
  removeProductFromCheckout,
  setSearchText,
} = userSlice.actions;

export default userSlice.reducer;
