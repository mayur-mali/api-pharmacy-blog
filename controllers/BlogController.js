const BlogServices = require("../services/BlogServices");
const BlogModel = require("../models/Blog");
var slugFun = require("slug");
exports.getAllBlogs = async (req, res) => {
  try {
    // await BlogServices.getAllBlogs()
    BlogModel.find({})
      .populate("user")
      .exec(function (err, blogs) {
        if (err) {
          return console.log(err);
        }
        return res.status(200).json(blogs);
      });
  } catch (err) {
    res.status(500).json({ error: err.massege });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await BlogServices.createBlog(req.body);
    res.status(201).json({ data: blog, status: "blog created" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "title is already present change the title" });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const blog = await BlogServices.getBlogById(req.params.id);
    res.status(200).json({ data: blog, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.massege });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await BlogServices.getBlogById(req.params.id);
    const { slug, title, body, ...others } = blog._doc;
    const newSlug = slugFun(req.body.title);
    const updatedblog = await BlogServices.updateBlog(req.params.id, {
      $set: {
        slug: newSlug,
        ...req.body,
        ...others,
      },
    });
    //console.log({ slug: newSlug, ...req.body, ...others });
    res.status(200).json({ data: updatedblog, status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.massege });
  }
};
