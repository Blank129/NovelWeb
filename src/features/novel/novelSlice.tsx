// src/features/novels/novelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchChapterById, fetchNovelById, fetchNovels, fetchNovelViewHighest, fetchTop3ViewNovels, fetchTop4RatingNovels } from '../../services/api';

const novelsSlice = createSlice({
  name: 'novels',
  initialState: {
    list: [],
    detailNovel: null,
    chapterNovel: null,
    novelViewHighest: null,
    top4NovelRating: [],
    top3NovelView: [],
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
      })

      .addCase(fetchChapterById.fulfilled, (state, action) => {
        state.loading = false;
        state.chapterNovel = action.payload;
      })

      .addCase(fetchChapterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNovelViewHighest.fulfilled, (state, action) => {
        state.loading = false;
        state.novelViewHighest = action.payload;
      })

      .addCase(fetchNovelViewHighest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTop4RatingNovels.fulfilled, (state, action) => {
        state.loading = false;
        state.top4NovelRating = action.payload;
      })

      .addCase(fetchTop4RatingNovels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTop3ViewNovels.fulfilled, (state, action) => {
        state.loading = false;
        state.top3NovelView = action.payload;
      })

      .addCase(fetchTop3ViewNovels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      
    //   .addCase(fetchNovels.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || 'Lỗi không xác định';
    //   });
  },
});

export default novelsSlice.reducer;
