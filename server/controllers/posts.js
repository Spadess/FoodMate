import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath} = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort({createdAt : -1}); //returns all the posts in the database +new
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({Error: error.message});
  }
};

//READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({createdAt : -1}); //sort posts by creation date
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({Error: error.message});
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({createdAt : -1});
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({Error: error.message});
  }
};

//UPDATE
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params; //grab the specific post we want to like
    const { userId } = req.body; //grab the user who made the request
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true); //add the like to the dictionary
    }

    const updatedPost = await Post.findByIdAndUpdate( //update the post with the new list of likes
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost); //update the frontend
  } catch (error) {
    res.status(404).json({Error: error.message});
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params; //grab the specific post we want to comment on
    const { userId, comment } = req.body; //grab the user who made the request
    const post = await Post.findById(postId);
    const {firstName, lastName} = await User.findById(userId);
    const name = firstName+" "+lastName

    post.comments.unshift(`${name}: ${comment}`)//add comment to the beginning of the array

    const updatedPost = await Post.findByIdAndUpdate( //update the post with the new list of comments
      postId,
      { comments: post.comments },
      { new: true }
    );

    res.status(200).json(updatedPost); //update the frontend
  } catch (error) {
    res.status(404).json({Error: error.message});
  }
};


export const deletePost = async (req, res) => {
  try {
    const {postId} = req.params;
    await Post.findByIdAndDelete(postId)
    const post = await Post.find().sort({createdAt : -1}); //sort posts by creation date
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({Error: error.message});
  }
};