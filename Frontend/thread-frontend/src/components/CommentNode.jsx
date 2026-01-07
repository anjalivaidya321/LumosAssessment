import { useState, useRef, useEffect } from "react";
import CommentForm from "./CommentForm.jsx";
import { getDisplayName } from "../utils.js";

export default function CommentNode({
  postId,
  comment,
  depth,
  replyTo,
  setReplyTo,
  reload
}) {
  const isReplying = replyTo && replyTo._id === comment._id;
  const [showMore, setShowMore] = useState(false);
  const textRef = useRef(null);
  const [needsTruncation, setNeedsTruncation] = useState(false);

  // Check if comment text exceeds 3 lines
  useEffect(() => {
    if (textRef.current) {
      const style = window.getComputedStyle(textRef.current);
      const lineHeight = parseFloat(style.lineHeight);
      // If line-height is 'normal', estimate it or assume ~1.5 * fontSize
      const actualLineHeight = !isNaN(lineHeight)
        ? lineHeight
        : parseFloat(style.fontSize) * 1.5;

      const maxHeight = actualLineHeight * 3;
      const actualHeight = textRef.current.scrollHeight;

      // Use a small buffer (e.g. 1px) to avoid precision issues
      const shouldTruncate = actualHeight > (maxHeight + 2);

      setNeedsTruncation(shouldTruncate);
      if (!shouldTruncate) {
        setShowMore(true);
      } else {
        setShowMore(false); // Reset to collapsed if it becomes long
      }
    }
  }, [comment.content]);

  // Generate a consistent "random" initial based on comment ID or content info
  // Since we don't have user names, we'll use "U" or "A"
  const displayName = getDisplayName(comment._id);
  const avatarInitial = displayName.charAt(0);

  return (
    <div className="comment-node" style={{ marginLeft: depth * 20 }}>
      <div className="comment-body">

        {/* New Header Section */}
        <div className="comment-header">
          <div className="comment-avatar">
            {avatarInitial}
          </div>
          <div className="comment-author-info">
            <span className="comment-author-name">{displayName}</span>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Content Wrapper for alignment */}
        <div className="comment-content-wrapper">
          <p
            ref={textRef}
            className={!showMore && needsTruncation ? 'comment-text-truncated' : ''}
          >
            {comment.content}
          </p>

          {needsTruncation && (
            <button
              type="button"
              className="show-more-button"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "...more"}
            </button>
          )}

          <div className="comment-actions-footer">
            <button
              type="button"
              className="link-button"
              onClick={() =>
                setReplyTo(isReplying ? null : comment)
              }
            >
              {isReplying ? "Cancel" : "Reply"}
            </button>
          </div>
        </div>

      </div>

      {isReplying && (
        <CommentForm
          postId={postId}
          parentComment={comment}
          onSuccess={() => {
            setReplyTo(null);
            reload();
          }}
        />
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="comment-children">
          {comment.children.map((child) => (
            <CommentNode
              key={child._id}
              postId={postId}
              comment={child}
              depth={depth + 1}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              reload={reload}
            />
          ))}
        </div>
      )}
    </div>
  );
}