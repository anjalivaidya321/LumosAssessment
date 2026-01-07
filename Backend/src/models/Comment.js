import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true
    },
    content: { type: String, required: true },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null
    }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export default mongoose.model("Comment", commentSchema);