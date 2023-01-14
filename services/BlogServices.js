const BlogModel = require("../models/Blog");

// exports.getAllBlogs = async () => {
//   await BlogModel.find({})
//     .populate("user")
//     .exec(function (err, blogs) {
//       if (err) {
//         return console.log(err);
//       }
//       return res.status(200).json(blogs);
//     });
// };

exports.createBlog = async (blog) => {
  return await BlogModel.create(blog);
};

exports.getBlogById = async (id) => {
  return await BlogModel.findById(id);
};

exports.updateBlog = async (id, blog) => {
  return await BlogModel.findByIdAndUpdate(id, blog);
};

exports.deleteBlog = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};
