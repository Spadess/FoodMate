import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "states";
import FlexCSS from "./FlexCSS";
import UserProfilePicture from "./UserProfilePicture";

const Friend = ({ friendId, firstName, lastName, picturePath}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friendsList = useSelector((state) => state.user.friendsList);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friendsList.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/api/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friendsList: data }));
  };

  return (
    <FlexCSS>
      <FlexCSS gap="1rem">
        <UserProfilePicture picturePath={picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: medium,
                cursor: "pointer",
              },
            }}
          >
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
          {`@${firstName}${lastName}`}
          </Typography>
        </Box>
      </FlexCSS>
    
    
    
    {(friendId !== _id) &&
      
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
  );
};

export default Friend;
