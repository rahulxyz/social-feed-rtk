import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PostsMainPage } from "./features/posts/PostsMainPage";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/editPost/:postId" element={<EditPostForm />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/" element={<PostsMainPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
