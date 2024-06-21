import { createAsyncThunk } from "@reduxjs/toolkit";
import loginServices from "./login.services";
import toast, { Toaster } from "react-hot-toast";

export const clickLogin = createAsyncThunk(
  "user/login",
  async (credentials) => {
    try {
      const res = await loginServices.login(credentials);
      console.log(res,"loginResponse")
      if (res.data?.error || res.data?.responseCode == 117) {
        console.log(res.data.error?.message);
        toast.error("Invalid Credentials");
      }
      return res.data;
    } catch (error) {
      toast.error("Something went wrong please try again");
      console.log(error);
    }
  }
);

export const getuserData = createAsyncThunk(
  "user/getuserdata",
  async (data) => {
    try {
      const res = await loginServices.userData(data);

      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  }
);
export const logoutApi = createAsyncThunk(
  "user/logout",
  async (credentials) => {
    try {
      const res = await loginServices.logoutApi(credentials);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong please try again");
    }
  }
);
