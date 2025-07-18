import { createSlice } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  title: string;
  content: string;
}

const initialState: Post[] = [
  { id: "1", title: "user1", content: "User1 says hi." },
  { id: "2", title: "user2", content: "User2 says hey." },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
