const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
  },
  img: {
    type: String,
    required: false,
    default: "https://picsum.photos/800"
  },
  body: {
    type: String,
    required: true,
    min: 10
  },
  author:{
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: false,
    default: false
  },
  category: {
    type: String,
    required: false
  }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("postModel", PostSchema, "Posts")
