import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAxiosInstance from "./axios";

export const fetchNovels = createAsyncThunk(
  'novels/fetchNovels', // tên action
  async (_, thunkAPI) => {
    try {
      const response = await apiAxiosInstance.get('/novels');
      return response.data;
    } catch (error: any) {
     // Xử lý lỗi và trả về lỗi có cấu trúc
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchNovelById = createAsyncThunk(
  'novels/fetchNovelById', // tên action
  async (id, thunkAPI) => {
    try {
      const response = await apiAxiosInstance.get(`/novel/${id}`);
      return response.data;
    } catch (error: any) {
     // Xử lý lỗi và trả về lỗi có cấu trúc
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);