import express from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

// GET /api/posts - list posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// POST /api/posts - create post
router.post("/", async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:postId - get single post
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:postId/comments - flat comments list
router.get("/:postId/comments", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = await Comment.find({ postId: post._id }).sort({
      createdAt: 1
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});



// POST /api/posts/:postId/comments - create comment or reply
router.post("/:postId/comments", async (req, res, next) => {
  try {
    const { content, parentCommentId = null } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);
      if (!parent) {
        return res.status(400).json({ message: "Parent comment not found" });
      }
    }

    const comment = await Comment.create({
      postId: post._id,
      content,
      parentCommentId: parentCommentId || null
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

// basic error handler
router.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default router;