const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(401).json(err);
      }
    } else {
      return res.status(401).json("you can only update your post");
    }
  } catch (err) {
    return res.status(401).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("post has been deleted..");
      } catch (err) {
        return res.status(401).json(err);
      }
    } else {
      return res.status(401).json("you can only delete your post");
    }
  } catch (err) {
    return res.status(401).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  if (req.body.postsId === req.params.id) {
    try {
      const post = await Post.findById(req.params.id);
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("post not found");
  }
});

// GET ALL POST

module.exports = router;
