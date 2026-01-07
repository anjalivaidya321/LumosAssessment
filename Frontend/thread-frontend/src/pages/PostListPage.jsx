import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getPosts()
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="center-page">
      <div className="post-list-container">
        <h1>Posts</h1>
        {posts.length === 0 && <p className="no-posts">No posts yet. Create one!</p>}
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p._id} className="post-list-item">
              <Link to={`/posts/${p._id}`} className="post-link">
                <h2>{p.title}</h2>
                <div className="post-snippet">
                  {p.content.length > 120
                    ? p.content.slice(0, 120) + "..."
                    : p.content}
                </div>
                <div className="meta-row">
                  <span className="timestamp">
                    {new Date(p.createdAt).toLocaleString()}
                  </span>
                </div>
              </Link>
              <div className="post-actions">
                <Link to={`/posts/${p._id}`} className="comment-link">
                  Comment
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}