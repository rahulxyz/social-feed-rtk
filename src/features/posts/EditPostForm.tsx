import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { postUpdated, selectPostById } from "./postsSlice";
import { selectCurrentUsername } from "../auths/authSlice";

// omit form element types

export const EditPostForm = () => {
  const { postId } = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId!));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector(selectCurrentUsername)!;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onSavePostClicked = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent server submission
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("postTitle") as string;
    const content = formData.get("postContent") as string;

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content, user: userId }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          defaultValue={post.title}
          required
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue={post.content}
          required
        />

        <button>Save Post</button>
      </form>
    </section>
  );
};
