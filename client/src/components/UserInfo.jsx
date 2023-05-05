import {
  EditOutlined,
  LocationOnOutlined,
  VerifiedOutlined,
  PeopleAltOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserProfilePicture from "components/UserProfilePicture";
import FlexCSS from "components/FlexCSS";
import WrapperCSS from "components/WrapperCSS";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserPicture } from "states";

const UserInfo = ({ userId, picturePath}) => {
  const token = useSelector((state) => state.token);
  const myUser = useSelector((state) => state.user);
  const isMyProfile = myUser._id === userId;
  const [user, setUser] = useState(null);
  //const isFriend = myUser.friendsList.find((friend) => friend._id === user._id);
  const [image, setImage] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  
  
  useEffect(() => { //empty array useeffect to only render this component once (avoid too many requests)
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 


  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    status,
    friendsList,
  } = user;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
      dispatch(setUserPicture({picturePath: image.name}));
      //setLetUpdate(true);
    }

    await fetch(`http://localhost:3001/api/users`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  };

  return (
    <WrapperCSS>
      {/* FIRST ROW */}
      <FlexCSS
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexCSS gap="1rem">
          {image ? <UserProfilePicture picturePath={image.name}/> : (
            <UserProfilePicture picturePath={picturePath}/>
          )}
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>@{firstName}{lastName}</Typography>


          </Box>

          
          
        </FlexCSS>
        
      </FlexCSS>
      
      <Divider />

      {/*1st row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PeopleAltOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={dark}>{friendsList.length} FoodMate(s)</Typography>
        </Box>
      </Box>
      
      {/*2nd row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <VerifiedOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={dark}>{status}</Typography>
        </Box>
      </Box>
      
      {/*3rd row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={dark}>{location}</Typography>
        </Box>
      </Box>
      
    
    </WrapperCSS>
  );
};

export default UserInfo;
