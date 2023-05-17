import {
  LocationOnOutlined,
  VerifiedOutlined,
  PeopleAltOutlined,
  PersonAddOutlined, 
  PersonRemoveOutlined,
} from "@mui/icons-material";
import { Box, 
  Typography, 
  Divider, 
  useTheme, 
  IconButton, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent
} from "@mui/material";
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
  const [open, setOpen] = useState(false);
  const isFriend = myUser.friendsList.find((friend) => friend._id === userId);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const bgcolor = palette.background.default;
  
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              component={'span'}
              variant="h4"
              color={dark}
              fontWeight="500"
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>@{firstName}{lastName}</Typography>

          </Box>

          {(userId !== myUser._id) &&

            <FlexCSS>
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
           
              {(user.status === "Chef") && 
                
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    borderRadius: "3rem",
                    backgroundColor: "#A10500",
                    color: "#F2E9EA",
                    "&:hover": { color: "#DF4661" }
                  }}
                >
                  Subscribe
                </Button>
                
              }
               <Dialog
                PaperProps={{
                  style:{backgroundColor:`${bgcolor}`, padding: 20, borderRadius: "1rem"}
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                titleStyle={{textAlign: "center"}}
                sx={{textAlign: "center"}}
              >
            <DialogTitle id="alert-dialog-title">
              {`${user.firstName} ${user.lastName} Kitchen Pass` }
            </DialogTitle>
            <DialogContent>
              <Typography id="alert-dialog-description" >
                Kitchen Pass lets you access exclusive content, <br/> recipes, tips, merchandise and live showcases!
              </Typography>
            </DialogContent>
            <FlexCSS >
              <Typography sx={{ml:"1.9rem"}}>Essential</Typography>
              <Typography sx={{ml:"-0.7rem"}}>Premium</Typography>
              <Typography sx={{mr:"2.3rem"}}>Deluxe</Typography>
            </FlexCSS>
            <FlexCSS>
            <Button
                  onClick={handleClickOpen}
                  sx={{
                    ml: "1.6rem",
                    borderRadius: "3rem",
                    backgroundColor: "#A10500",
                    color: "#F2E9EA",
                    "&:hover": { color: "#DF4661" }
                  }}
                >
                  €4.99
                </Button>
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    
                    borderRadius: "3rem",
                    backgroundColor: "#A10500",
                    color: "#F2E9EA",
                    "&:hover": { color: "#DF4661" }
                  }}
                >
                  €7.99
                </Button>
                <Button
                  onClick={handleClickOpen}
                  sx={{
                    mr: "1.6rem",
                    borderRadius: "3rem",
                    backgroundColor: "#A10500",
                    color: "#F2E9EA",
                    "&:hover": { color: "#DF4661" }
                  }}
                >
                  €9.99
                </Button>
                </FlexCSS>
          </Dialog>
            </FlexCSS>
            
          }

          
        </FlexCSS>
        
      </FlexCSS>
      
      <Divider />

      {/*1st row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <PeopleAltOutlined fontSize="large" sx={{ color: main }} />
          <Typography component={'span'} color={dark}>
            
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
          <Typography component={'span'} color={dark}>{status}</Typography>
        </Box>
      </Box>
      
      {/*3rd row*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography component={'span'} color={dark}>{location}</Typography>
        </Box>
      </Box>
      
    
    </WrapperCSS>
  );
};

export default UserInfo;
