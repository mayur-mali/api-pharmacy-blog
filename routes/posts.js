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
router.put("/:id", async (req, res) => {});

//DELETE POST
router.delete("/:id", async (req, res) => {});

//GET POST
router.get("/:id", async (req, res) => {});

module.exports = router;
