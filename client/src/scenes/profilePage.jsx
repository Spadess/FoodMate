import { Box} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavigationBar from "./navigationBar";
import Posts from "../components/Posts";
import NewPost from "../components/NewPost";
import Advertisement from "../components/Advertisement";
import UserInfo from "../components/UserInfo";
import FriendsList from "../components/FriendsList";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const myUser = useSelector((state) => state.user);
  const adPublisher = ["McDonald's", "Burger King"];
  const description = ["I'm lovin' it", "Have it Your Way" ];
  const adPicture = ["mcdo.jpg", "bk.jpg"];
  const adURL = ["https://www.mcdonalds.fr/","https://www.burgerking.fr/"];

  

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (!user) return null;

  return (
    <Box>
      <NavigationBar userId={userId}/>
      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis="26%">
          <UserInfo userId={userId} picturePath={user.picturePath} />

          {(myUser._id === userId) && 
            <FriendsList userId={myUser._id}></FriendsList>
          }
        </Box>
        <Box
          flexBasis="42%"
        >
        {(myUser._id === userId) && 
        <NewPost picturePath={userId.picturePath} />
        }
        <Posts userId={userId} isProfile={true}/>
        
        </Box>
        <Box flexBasis="26%">
          <Advertisement adPublisher={adPublisher[0]} description={description[0]} adPicture={adPicture[0]} adURL ={adURL[0]}/>
          <Advertisement adPublisher={adPublisher[1]} description={description[1]} adPicture={adPicture[1]} adURL ={adURL[1]}/>
          
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
