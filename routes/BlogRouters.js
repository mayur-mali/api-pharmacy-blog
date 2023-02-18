const express = require("express");
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  updateBlogView,
  deleteBlog,
  maxview,
  searchBlog,
  likePost,
} = require("../controllers/BlogController");

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/search").get(searchBlog);
router.route("/views").get(maxview);
router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
router.route("/view/:id").put(updateBlogView);
router.route("/like/:id").put(likePost);
module.exports = router;
