import {
  LocationOnOutlined,
  VerifiedOutlined,
  PeopleAltOutlined,
  PersonAddOutlined, 
  PersonRemoveOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserProfilePicture from "components/UserProfilePicture";
import FlexCSS from "components/FlexCSS";
import WrapperCSS from "components/WrapperCSS";
import { setFriends } from "states";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const UserInfo = ({ userId, picturePath}) => {
  const token = useSelector((state) => state.token);
  const myUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const isFriend = myUser.friendsList.find((friend) => friend._id === userId);
  const { palette } = useTheme();
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

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/api/users/${myUser._id}/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friendsList : data }));
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

  

  return (
    <WrapperCSS>
      {/* FIRST ROW */}
      <FlexCSS
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexCSS gap="1rem">
          
          <UserProfilePicture picturePath={picturePath}/>
          
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

          {(userId !== myUser._id) &&
      
            <IconButton
              onClick={() => patchFriend()}
              sx={{ p: "0.6rem" }}
            >
              {isFriend ? (
                <PersonRemoveOutlined sx={{ color: dark }} />
              ) : (
                <PersonAddOutlined sx={{ color: dark }} />
              )}
            </IconButton>
          }

          
        </FlexCSS>
        
      </FlexCSS>
      
      <Divider />

      {/*1st row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PeopleAltOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={dark}>
            
            {(user._id ===  myUser._id)  ? 
              <div> {myUser.friendsList.length} FoodMate(s) </div>
               : (
                <div>{friendsList.length} FoodMate(s) </div>
              )
            }
            
            
            </Typography>
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
