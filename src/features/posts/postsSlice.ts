import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { userLoggedOut } from "../auths/authSlice";

export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
}

const initialState: Post[] = [
  { id: "1", title: "user1", content: "User1 says hi.", user: '0' },
  { id: "2", title: "user2", content: "User2 says hey.", user: '1'  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  selectors: {
    selectAllPosts: (postsState) => postsState,
    selectPostById: (postsState, postId: string) => {
      return postsState.find((post) => post.id === postId);
    },
  },
    extraReducers: (builder) => {
    // Pass the action creator to `builder.addCase()`
    builder.addCase(userLoggedOut, (_) => {
      // Clear out the list of posts whenever the user logs out
      return []
    })
  },
});

export const { postAdded, postUpdated } = postSlice.actions;
export const { selectAllPosts, selectPostById } = postSlice.selectors;

export default postSlice.reducer;

// export const selectAllPosts = (state: RootState) => state.posts

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.find(post => post.id === postId)
