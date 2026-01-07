import { useState } from "react";
import { api } from "../api.js";
import { getDisplayName } from "../utils.js";

export default function CommentForm({ postId, parentComment, onSuccess }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.createComment(postId, {
        content,
        parentCommentId: parentComment ? parentComment._id : null
      });
      setContent("");
      setIsExpanded(false);
      onSuccess?.();
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleFocus() {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  }

  function handleCancel() {
    setIsExpanded(false);
    setContent("");
  }

  const parentName = parentComment ? getDisplayName(parentComment._id) : null;

  return (
    <form onSubmit={handleSubmit} className={`comment-form-wrapper ${isExpanded ? 'expanded' : ''}`}>
      {parentComment && parentName && (
        <p className="replying-to">
          Replying to: <span>{parentName}</span>
        </p>
      )}
      {error && <p className="error">{error}</p>}
      <div className="comment-input-wrapper">

        <div className="comment-input-container">
          <textarea
            rows={isExpanded ? 3 : 1}
            placeholder={parentComment ? "Add a reply..." : "Join the conversation..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleFocus}
            required
            className="comment-textarea"
          />
          {isExpanded && (
            <div className="comment-form-footer">
              <div className="comment-form-actions-right">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-comment"
                  disabled={submitting || !content.trim()}
                >
                  {submitting ? "Posting..." : "Comment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}