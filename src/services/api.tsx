import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAxiosInstance from "./axios";

export const fetchNovels = createAsyncThunk(
  'novels/fetchNovels', // tên action
  async (_, thunkAPI) => {
    try {
      const response = await apiAxiosInstance.get('/novel/novels');
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

export const fetchChapterById = createAsyncThunk(
  'novels/fetchChapterById', // tên action
  async (payload, thunkAPI) => {
    try {
      const { id, chapter }: any = payload; 
      const response = await apiAxiosInstance.get(`/novel/${id}/chapter/${chapter}`);
      return response.data;
    } catch (error: any) {
     // Xử lý lỗi và trả về lỗi có cấu trúc
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchNovelViewHighest = createAsyncThunk(
  'novels/fetchNovelViewHighest', // tên action
  async (_, thunkAPI) => {
    try {
      const response = await apiAxiosInstance.get('/novel/highest-view');
      return response.data;
    } catch (error: any) {
     // Xử lý lỗi và trả về lỗi có cấu trúc
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchTop4RatingNovels = createAsyncThunk(
  'novels/fetchTop4RatingNovels', // tên action
  async (_, thunkAPI) => {
    try {
      const response = await apiAxiosInstance.get('/novel/top4-rating');
      return response.data;
    } catch (error: any) {
     // Xử lý lỗi và trả về lỗi có cấu trúc
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const fetchTop3ViewNovels = createAsyncThunk(
  'novels/fetchTop3ViewNovels', // tên action
  async (_, thunkAPI) => {
    try {
      const response = await apiAxiosInstance.get('/novel/top3-views');
      return response.data;
    } catch (error: any) {
     // Xử lý lỗi và trả về lỗi có cấu trúc
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);