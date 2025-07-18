import { nanoid } from "@reduxjs/toolkit";
import { postAdded, type Post } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectAllUsers } from "../users/usersSlice";

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const formData = new FormData(event.currentTarget);
    const title = formData.get("postTitle") as string;
    const content = formData.get("postContent") as string;
    const userId = formData.get("postAuthor") as string;

    const newPost: Post = {
      id: nanoid(),
      title,
      content,
      user: userId,
    };

    dispatch(postAdded(newPost));
    event.currentTarget.reset();
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          defaultValue=""
          required
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select>
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
