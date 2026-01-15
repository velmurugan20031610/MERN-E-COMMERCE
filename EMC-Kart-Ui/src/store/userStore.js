import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { firebaseLogin, signoutFirebaseUser } from "../service/firebaseService";

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    // Firebase login
    const cred = await firebaseLogin({ email, password });

    // Firebase token
    const token = await cred.user.getIdToken();
    localStorage.setItem("token", token);

    // Backend validation
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
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    checkoutProducts: [],
    searchText: "",
    loading: false,
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
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
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
