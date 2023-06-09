import {
  PollOutlined,
  GifBoxOutlined,
  ImageOutlined,
  VideocamOutlined
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button
} from "@mui/material";
import FlexCSS from "components/FlexCSS";
import Dropzone from "react-dropzone";
import UserProfilePicture from "components/UserProfilePicture";
import WrapperCSS from "components/WrapperCSS";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "states";

const NewPost = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [post, setPost] = useState("");
  var allowPost = (image || post || video);
  const { palette } = useTheme();
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    if(video){
      formData.append("video", video);
      formData.append("videoPath", video.name);
    }
  
    /*console.log("client sent\n");
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ': ' + pair[1]); 
  }*/

    var response;
    if(video){
      response = await fetch(`http://localhost:3001/api/posts/videoUpload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
    }

    else if(image){
      response = await fetch(`http://localhost:3001/api/posts/pictureUpload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
    }

    else{
      response = await fetch(`http://localhost:3001/api/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
    }

    
    const posts = await response.json();
    //console.log("backend response\n", posts);
    
    dispatch(setPosts({ posts }));
    setImage(null);
    setVideo(null);
    setPost("");
  };

  return (
    <WrapperCSS mb="2rem">
      <FlexCSS gap="1.5rem">
        <UserProfilePicture picturePath={picturePath} />
        <InputBase
          placeholder="Food for thought..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            cursor: "none"
          }}
          style={{cursor:"none"}}
        />
      </FlexCSS>
      

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexCSS>
        <FlexCSS gap="0.25rem">
          
        <ImageOutlined sx={{ color: mediumMain }} />
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              
                <Box
                  {...getRootProps()}
                  width="100%"
                  height="10%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  
                >
                  <input {...getInputProps()} />
                  
                  <Typography
                    color={mediumMain}
                    sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                  >
                    Image
                  </Typography>
                </Box>
              
            )}
          </Dropzone>
        </FlexCSS>

        <FlexCSS gap="0.25rem">
            <GifBoxOutlined sx={{ color: mediumMain }} />
            <Typography 
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              GIF
              </Typography>
          </FlexCSS>

        <FlexCSS gap="0.25rem">
        <VideocamOutlined sx={{ color: mediumMain }} />
        <Dropzone
            accept= {{
              'video/mp4': ['.mp4', '.MP4'],
            }}
            acceptedFiles=".mp4, .MP4"
            multiple={false}
            onDrop={(acceptedFiles) => setVideo(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              
                <Box
                  {...getRootProps()}
                  width="100%"
                  height="10%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  
                >
                  <input {...getInputProps()} />
                  
                  <Typography
                    color={mediumMain}
                    sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                  >
                    Video
                  </Typography>
                </Box>
              
            )}
          </Dropzone>
        </FlexCSS>

          <FlexCSS gap="0.25rem">
            <PollOutlined sx={{ color: mediumMain }} />
            <Typography
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            color={mediumMain}
            >
              Poll
            </Typography>
          </FlexCSS>
          
        <Button
          disabled={!allowPost}
          onClick={() => {handlePost() ; setIsImage(!isImage)}}
          
          sx={{
            borderRadius: "3rem",
            backgroundColor: "#A10500",
            color: "#F2E9EA",
            "&:hover": { color: "#DF4661" }
          }}
        >
          Post
        </Button>
      </FlexCSS>
    </WrapperCSS>
  );
};

export default NewPost;
