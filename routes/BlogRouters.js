const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  updateBlogView,
  deleteBlog,
  maxview,
} = require("../controllers/BlogController");
const Blog = require("../models/Blog");
// const User = require("../models/User");
const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/views").get(maxview);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route("/view/:id").put(updateBlogView);

module.exports = router;
