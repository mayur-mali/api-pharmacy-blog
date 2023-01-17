const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const dayjs = require("dayjs");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: { type: String, required: true },
  image: { type: String },
  slug: { type: String, slug: "title" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  views: { type: Number, default: 0 },
});

blogSchema.statics.findBySlug = function (slug) {
  return this.where({ slug });
};

module.exports = mongoose.model("Blog", blogSchema);
