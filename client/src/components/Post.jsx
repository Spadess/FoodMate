import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlined
} from "@mui/icons-material";
import { Button, Divider, Box, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexCSS from "components/FlexCSS";
import Friend from "components/Friend";
import WrapperCSS from "components/WrapperCSS";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "states";

const Post = ({
  postId,
  postUserId,
  firstName,
  lastName,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt
}) => {
  const [commentSection, setCommentSection] = useState(false);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[userId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    
  };

  const patchComment = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userId: `${userId}`, comment: `${comment}`}),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    
  };

  const deleteComment = async () => {
    const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedPosts = await response.json();
    dispatch(setPosts({ posts: updatedPosts }));
  };

  return (
    <WrapperCSS mb="2rem">
      <Friend
        friendId={postUserId}
        firstName={firstName}
        lastName={lastName}
        picturePath={userPicturePath}
      />
      
      <Typography color={dark} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

     {(picturePath) &&
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/pictures/${picturePath}`}
        />
     }

      <Typography color={medium} sx={{ mt: "0.75rem" }}>
      {`${new Date(createdAt)}`}
      </Typography>
      <FlexCSS mt="0.25rem">
        <FlexCSS gap="1rem">
          <FlexCSS gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexCSS>

          <FlexCSS gap="0.3rem">
            
            <IconButton onClick={() => setCommentSection(!commentSection)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexCSS>
        </FlexCSS>
        
        {(postUserId === userId) &&
        <IconButton onClick={deleteComment}>
          <DeleteOutlined/>
        </IconButton>
        }
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexCSS>
      {commentSection && (
        <Box mt="0.5rem">
         
          <Box>
          <FlexCSS>
            <InputBase
            placeholder="Comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
              width: "80%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
            <Button
              disabled={!comment}
              onClick={() => {patchComment() ; setComment("")}}
              sx={{
                maxBlockSize: "5",
                borderRadius: "10rem",
                backgroundColor: "#A10500",
                color: "#F2E9EA",
                "&:hover": { color: "#DF4661" }
                }}>
              Comment
            </Button>
          </FlexCSS>
          
          </Box> 
          {comments.map((comment, i) => (
            <Box key={i}>
              <Typography sx={{ color: dark, m: "1rem 0", pl: "0.2rem" }}>
                {comment}
              </Typography>
              <Divider />
            </Box>
          ))}
         
        </Box>
      )}
    </WrapperCSS>
  );
};

export default Post;
