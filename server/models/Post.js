import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    videoPath: String,
    userPicturePath: String,
     
    likes: {
      type: Map, //map better than array of string cz a dictionary performs better -> O(1) vs O(n)
      of: Boolean
    },
    comments: {
      type: Array,
      default: [],
    }
  },
  {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;