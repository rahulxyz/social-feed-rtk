import { useEffect } from "react";
import {
    addNewPost,
  fetchNewPosts,
  selectAllNewPosts,
  selectNewPostsError,
  selectNewPostsStatus,
  type INewPost,
} from "./newPostSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const NewPostList = () => {
  const dispatch = useAppDispatch();
  const newPostList = useAppSelector(selectAllNewPosts);
  const newPostStatus = useAppSelector(selectNewPostsStatus);
  const newPostError = useAppSelector(selectNewPostsError);

  useEffect(() => {
    if (newPostStatus === "idle") {
      dispatch(fetchNewPosts());
    }
  }, [newPostStatus, dispatch]);

//   const addPost = async (newPost: Omit<INewPost, 'id'>)=>{
//     await 
//   }

  useEffect(() => {
    const newPost = {
      title: "foo",
      body: "bar",
      userId: 1,
    };

    // addPost(newPost);
    dispatch(addNewPost(newPost))
  }, []);

  if (newPostStatus == "rejected") return <div>error</div>;

  if (newPostStatus == "pending") return <div>...loading</div>;

  return <div>newPostlist</div>;
};

export default NewPostList;
