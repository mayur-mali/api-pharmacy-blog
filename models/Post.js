const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: { type: String, slug: "title" },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    author: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    views: { type: Number, default: 0 },
    currentDate: {
      type: String,
    },
  },
  { timestamps: true }
);

PostSchema.statics.findBySlug = function (slug) {
  return this.where({ slug: new RegExp(slug, "i") });
};
module.exports = mongoose.model("Post", PostSchema);
