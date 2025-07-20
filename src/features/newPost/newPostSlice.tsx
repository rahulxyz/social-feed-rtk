import type { RootState } from "@/app/store";
import { createAppAsyncThunk } from "@/app/WithTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface INewPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface INewPostState {
  newPosts: INewPost[];
  status: "idle" | "pending" | "succeeded" | "rejected";
  error: string | null;
}
// {
//         title: "foo",
//         body: "bar",
//         userId: 1,
//       }

export const addNewPost = createAppAsyncThunk(
  "newPosts/addNewPosts",
  async (newPost: Omit<INewPost, "id">) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(">>>data", data);
    return data;
  }
);

export const fetchNewPosts = createAppAsyncThunk(
  "newPosts/fetchNewPosts",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  },
  {
    condition(arg, thunkApi) {
      const newPostsStatus = selectNewPostsStatus(thunkApi.getState());
      if (newPostsStatus !== "idle") {
        return false;
      }
    },
  }
);

const initialState: INewPostState = {
  newPosts: [],
  status: "idle",
  error: null,
};

const newPostSlice = createSlice({
  name: "newPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchNewPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Save the fetched posts into state
        state.newPosts = action.payload;
      })
      .addCase(fetchNewPosts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = (action.error.message as string) ?? "Unknown Error";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.newPosts.push(action.payload);
      });
  },
});

export default newPostSlice.reducer;

export const selectAllNewPosts = (state: RootState) => state.newPosts.newPosts;
export const selectNewPostsStatus = (state: RootState) => state.newPosts.status;
export const selectNewPostsError = (state: RootState) => state.newPosts.error;
