import { configureStore, type Action, type ThunkAction } from "@reduxjs/toolkit";
import postsReducer from "@/features/posts/postsSlice"
import usersReducer from "@/features/users/usersSlice";
import authReducer from "@/features/auths/authSlice";
import newPostsReducer from "@/features/newPost/newPostSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
        users: usersReducer,
        newPosts: newPostsReducer,
    }
})

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>