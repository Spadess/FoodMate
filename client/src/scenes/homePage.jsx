import { Box} from "@mui/material";
import { useSelector } from "react-redux";
import NavigationBar from "./navigationBar";
import UserInfo from "../components/UserInfo";
import NewPost from "../components/NewPost";
import Posts from "../components/Posts";
import Advertisement from "../components/Advertisement";
import FriendsList from "../components/FriendsList";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const adPublisher = ["McDonald's", "Burger King"];
  const description = ["I'm lovin' it", "Have it Your Way" ];
  const adPicture = ["mcdo.jpg", "bk.jpg"];
  const adURL = ["https://www.mcdonalds.fr/","https://www.burgerking.fr/"];

  return (
    <Box>
      <NavigationBar userId={_id}/>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="3rem"
        justifyContent="space-between"
      >
        <Box flexBasis="26%">
          <UserInfo userId={_id} picturePath={picturePath} />
          <FriendsList userId={_id}></FriendsList>
          
        </Box>
        <Box
          flexBasis="42%"
        >
        <NewPost picturePath={picturePath} />
        <Posts userId={_id}/>
        </Box>

        <Box flexBasis="26%">
          <Advertisement adPublisher={adPublisher[0]} description={description[0]} adPicture={adPicture[0]} adURL ={adURL[0]}/>
          <Advertisement adPublisher={adPublisher[1]} description={description[1]} adPicture={adPicture[1]} adURL ={adURL[1]}/>
          
          
        </Box>
        
      </Box>
    </Box>
  );
};

export default HomePage;
