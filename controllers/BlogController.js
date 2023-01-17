const BlogServices = require("../services/BlogServices");
const BlogModel = require("../models/Blog");
var slugFun = require("slug");
const User = require("../models/User");
const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

exports.getAllBlogs = async (req, res) => {
  try {
    BlogModel.find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .exec(function (err, blogs) {
        if (err) {
          return console.log(err);
        }
        return res.status(200).json(blogs);
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await BlogServices.createBlog(req.body);
    res.status(201).json({ data: blog, status: "blog created" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    BlogModel.findById(req.params.id)
      .populate("user")
      .exec(function (err, blog) {
        if (err) {
          return res.status(400).json(err);
        }
        if (blog) {
          return res.status(200).json(blog);
        } else {
          res.status(400).json({ massage: "post not found" });
        }
      });
    //res.status(200).json({ data: blog, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.massege });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await BlogServices.getBlogById(req.params.id);
    const { slug, title, body, ...others } = blog._doc;
    if (blog.user == req.body.user) {
      const newSlug = slugFun(req.body.title);
      const updatedblog = await BlogServices.updateBlog(req.params.id, {
        $set: {
          slug: newSlug,
          ...req.body,
          ...others,
        },
      });
      console.log(req.body, others, updatedblog);
      res.status(200).json({ data: updatedblog, status: "success" });
    } else {
      res.status(401).json({
        data: blog,
        massage: "You can only update your post",
        status: "rejected",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.massege });
  }
};

exports.updateBlogView = async (req, res) => {
  const post = await BlogModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $inc: { views: 1 } },
    { new: true }
  );
  return res.status(200).json({ data: post, status: "views update" });
};

exports.deleteBlog = async (req, res) => {
  try {
    const post = await BlogServices.getBlogById(req.params.id);
    console.log(post.user, req.body, req.params.id);
    if (post.user == req.body.user) {
      const blog = await BlogServices.deleteBlog(req.params.id);
      res.status(200).json({ data: blog, massage: "blog deleted" });
    } else {
      res.status(401).json({ massage: "you can only delete your post" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.maxview = async (req, res) => {
  // const currentDate = dayjs(new Date()).format("L");
  try {
    // const post = await BlogModel.find({
    //   $and: [
    //     {
    //       createdAt: {
    //         $eq: new Date(),
    //       },
    //     },
    //     { views: { $gte: 0 } },
    //   ],
    // });
    const post = await BlogModel.find({
      views: { $gte: 10 },
    })
      .populate("user")
      .exec(function (err, blogs) {
        if (blogs.length <= 0) {
          return res.status(400).json({ message: "not found any post" });
        }
        if (blogs) {
          return res.status(200).json(blogs);
        }
      });
  } catch (err) {
    return res.status(400).json(err);
  }
};
