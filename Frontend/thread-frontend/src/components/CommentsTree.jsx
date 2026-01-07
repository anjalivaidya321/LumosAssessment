import { useMemo, useState } from "react";
import CommentNode from "./CommentNode.jsx";

function buildTree(comments) {
  const map = new Map();
  comments.forEach((c) => map.set(c._id, { ...c, children: [] }));

  const roots = [];
  map.forEach((node) => {
    if (node.parentCommentId) {
      const parent = map.get(node.parentCommentId);
      if (parent) parent.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

export default function CommentsTree({ postId, comments, reload }) {
  const tree = useMemo(() => buildTree(comments), [comments]);
  const [replyTo, setReplyTo] = useState(null);

  return (
    <div className="comments-tree">
      {tree.length === 0 && <p>No comments yet.</p>}
      {tree.map((c) => (
        <CommentNode
          key={c._id}
          postId={postId}
          comment={c}
          depth={0}
          replyTo={replyTo}
          setReplyTo={setReplyTo}
          reload={reload}
        />
      ))}
    </div>
  );
}