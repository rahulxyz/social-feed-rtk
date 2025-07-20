import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PostsMainPage } from "./features/posts/PostsMainPage";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";
import { selectCurrentUsername } from "./features/auths/authSlice";
import { useAppSelector } from "./app/hooks";
import { LoginPage } from "./features/auths/LoginPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername);

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/posts" element={<PostsMainPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
