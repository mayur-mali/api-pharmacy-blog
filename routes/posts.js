const router = require("express").Router();
const dayjs = require("dayjs");
const Post = require("../models/Post");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
//CREATE POST
router.post("/", async (req, res) => {
  const currentDate = dayjs(new Date()).format("L");
  const newPost = new Post({ ...req.body, currentDate });
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
router.get("/:slug", async (req, res) => {
  try {
    let post = await Post.findBySlug(req.params.slug);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE POST VIWES

router.put("/views/:id", async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } },
    { new: true }
  );

  return res.status(200).json("views update");
});

// max views post

router.get("/views/max", async (req, res) => {
  const post = await Post.find({
    $and: [
      {
        currentDate: {
          $eq: dayjs(new Date()).format("L"),
        },
      },
      { views: { $gte: 15 } },
    ],
  });
  if (post.length <= 0) {
    return res.status(400).json({ message: "not found any post" });
  }
  if (post) {
    return res.status(200).json({ post });
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
