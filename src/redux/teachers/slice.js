import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";

const PAGE_SIZE = 4;

export const fetchTeachersThunk = createAsyncThunk(
  "teachers/fetchTeachers",
  async ({ lastDocId = null }, { rejectWithValue }) => {
    try {
      let q;
      const baseQuery = query(
        collection(db, "teachers"),
        orderBy("name"),
        limit(PAGE_SIZE)
      );

      if (lastDocId) {
        const lastDocSnapshot = await getDoc(doc(db, "teachers", lastDocId));
        q = query(baseQuery, startAfter(lastDocSnapshot));
      } else {
        q = baseQuery;
      }

      const snapshot = await getDocs(q);
      const teachers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];

      return {
        teachers,
        lastDocId: lastVisible?.id || null,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    items: [],
    lastDocId: null,
    loading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    resetTeachers(state) {
      state.items = [];
      state.lastDocId = null;
      state.loading = false;
      state.error = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.teachers];
        state.lastDocId = action.payload.lastDocId;
        state.hasMore = action.payload.teachers.length === PAGE_SIZE;
      })
      .addCase(fetchTeachersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load teachers";
      });
  },
});

export const { resetTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
