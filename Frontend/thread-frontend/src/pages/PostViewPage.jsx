import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api.js";
import CommentForm from "../components/CommentForm.jsx";
import CommentsTree from "../components/CommentsTree.jsx";

export default function PostViewPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [p, c] = await Promise.all([
        api.getPost(postId),
        api.getComments(postId)
      ]);
      setPost(p);
      setComments(c);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <div className="card post-card">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-content">{post.content}</p>
        <p className="timestamp">
          Posted on {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="join-conversation-wrapper">
        <CommentForm
          postId={postId}
          onSuccess={load}
          parentComment={null}
        />
      </div>

      <div className="comments-section-header">
        <h3>Comments</h3>
        <div className="divider-line"></div>
      </div>

      <div className="card comments-card">
        <CommentsTree
          postId={postId}
          comments={comments}
          reload={load}
        />
      </div>
    </>
  );
}