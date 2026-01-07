import { useState } from "react";
import { api } from "../api.js";

export default function PostCreateForm({ onSuccess }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const post = await api.createPost({ title, content });
            setTitle("");
            setContent("");
            if (onSuccess) {
                onSuccess(post);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="card create-post-card">
            <h2 className="create-post-title">Create Post</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Title
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="What's on your mind?"
                    />
                </label>
                <label>
                    Content
                    <textarea
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        placeholder="Share details..."
                    />
                </label>
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={submitting || !title || !content}
                >
                    {submitting ? "Saving..." : "Create"}
                </button>
            </form>
        </div>
    );
}
