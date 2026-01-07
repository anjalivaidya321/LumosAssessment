import { Routes, Route, Link } from "react-router-dom";
import PostListPage from "./pages/PostListPage.jsx";
import PostCreatePage from "./pages/PostCreatePage.jsx";
import PostViewPage from "./pages/PostViewPage.jsx";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-left">
          <Link to="/" className="brand">
            Thread<span>Hub</span>
          </Link>
        </div>

        <div className="app-header-center">
          <Link to="/" className="nav-link-header">
            All Posts
          </Link>
        </div>

        <div className="app-header-right">
          <Link to="/posts/new" className="btn-primary">
            Create Post
          </Link>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/posts/new" element={<PostCreatePage />} />
          <Route path="/posts/:postId" element={<PostViewPage />} />
        </Routes>
      </main>
    </div>
  );
}