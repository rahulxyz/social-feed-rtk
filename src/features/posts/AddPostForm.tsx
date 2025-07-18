import { nanoid } from "@reduxjs/toolkit";
import { postAdded, type Post } from "./postsSlice";
import { useAppDispatch } from "@/app/hooks";

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget)
    const formData = new FormData(event.currentTarget);
    const title = formData.get("postTitle") as string;
    const content = formData.get("postContent") as string;

    const newPost: Post = {
      id: nanoid(),
      title,
      content,
    };

    dispatch(postAdded(newPost));
    event.currentTarget.reset();
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue="" required />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button>Save Post</button>
      </form>
    </section>
  );
};
