// src/features/novels/novelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchNovelById, fetchNovels } from '../../services/api';

const novelsSlice = createSlice({
  name: 'novels',
  initialState: {
    list: [],
    detailNovel: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNovels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNovels.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchNovelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNovelById.fulfilled, (state, action) => {
        state.loading = false;
        state.detailNovel = action.payload;
      });
    //   .addCase(fetchNovels.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || 'Lỗi không xác định';
    //   });
  },
});

export default novelsSlice.reducer;
