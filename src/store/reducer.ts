import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// In real project I would create "type" directory, "constants" directory, "service" directory for fetch functions
// but there I made it locally for time saving
export interface IState {
  isLoading: boolean;
  users: IUser[];
  userPosts: IPost[];
  isPostsLoading: boolean;
  userAlbums: IAlbum[];
  isAlbumsLoading: boolean;
}

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
}

export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const initialState: IState = {
  isLoading: false,
  users: [],
  userPosts: [],
  isPostsLoading: false,
  userAlbums: [],
  isAlbumsLoading: false,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data);
});

export const fetchUserPosts = createAsyncThunk(
  "user/posts",
  (user_id: number) => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/?userId=${user_id}`)
      .then((res) => res.data);
  }
);

export const fetchUserAlbums = createAsyncThunk(
  "user/albums",
  (user_id: number) => {
    return axios
      .get(`https://jsonplaceholder.typicode.com/albums/?userId=${user_id}`)
      .then((res) => res.data);
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchUserPosts.pending, (state) => {
      state.isPostsLoading = true;
      state.userPosts = [];
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.isPostsLoading = false;
      state.userPosts = action.payload;
    });
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.isPostsLoading = false;
    });

    builder.addCase(fetchUserAlbums.pending, (state) => {
      state.isAlbumsLoading = true;
      state.userAlbums = [];
    });
    builder.addCase(fetchUserAlbums.fulfilled, (state, action) => {
      state.isAlbumsLoading = false;
      state.userAlbums = action.payload;
    });
    builder.addCase(fetchUserAlbums.rejected, (state) => {
      state.isAlbumsLoading = false;
    });
  },
});

export const {} = mainSlice.actions;

export default mainSlice.reducer;
