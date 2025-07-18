import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { PostsList } from "./features/posts/postsList";

function App() {

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PostsList />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
