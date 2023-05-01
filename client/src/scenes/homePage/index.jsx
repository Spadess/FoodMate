import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavigationBar from "scenes/navigationBar";
//import UserWidget from "scenes/widgets/UserWidget";
//import MyPostWidget from "scenes/widgets/MyPostWidget";
//import PostsWidget from "scenes/widgets/PostsWidget";
//import AdvertWidget from "scenes/widgets/AdvertWidget";
//import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  //const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  //const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavigationBar/>
      
    </Box>
  );
};

export default HomePage;
