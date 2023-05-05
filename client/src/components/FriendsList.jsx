import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WrapperCSS from "components/WrapperCSS";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "states";

const FriendsList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friendsList = useSelector((state) => state.user.friendsList);
  //console.log(friendsList);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/api/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friendsList: data }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <WrapperCSS m="2rem 0">
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        FoodMates ({friendsList.length})
      </Typography>
      
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friendsList.map((friend, i) => (
          <Friend
            key={i}
            friendId={friend._id}
            firstName={friend.firstName}
            lastName={friend.lastName}
            picturePath={friend.picturePath}
          />
          ))}
      </Box>
    </WrapperCSS>
  );
};

export default FriendsList;
