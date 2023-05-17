import logo from "../logo.svg"
import {
  Box,
  IconButton,
  InputBase,
  Select,
  Typography,
  ListItemText,
  MenuItem,
  FormControl,
  useTheme,
  MenuList,
  Divider
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "states";
import { useNavigate } from "react-router-dom";
import FlexCSS from "components/FlexCSS";
import { useState, useEffect } from "react";
import UserProfilePicture from "components/UserProfilePicture";
import WrapperCSS from "components/WrapperCSS";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const foundUsers = await fetch(`http://localhost:3001/api/users/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      });

      setUsers(await foundUsers.json());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const searchUser = async (e) => {
    const searchValue = e.target.value;
    const foundUsers = await fetch(`http://localhost:3001/api/users?search=${searchValue}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
    setUsers(await foundUsers.json()); 
  };

  

  return (
    <FlexCSS  padding="1rem 6%" backgroundColor={alt}>
        <Box 
        width="120px"
        height="55px"
          onClick={()=> navigate("/home")}
          sx={{
              
              "&:hover":{
                cursor: "pointer",
              }
            }}>
          <img
              style={{ objectFit: "cover" }}
              width="120px"
              height="55px"
              src={logo}
              alt={logo}
            />
        </Box>
          
          <FlexCSS
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="5rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" onChange={searchUser}/>
            <IconButton>
              <Search />
            </IconButton>
          </FlexCSS>
        
            {users.length !== 0 && (
             
               <WrapperCSS width="20rem" height="5rem" sx={{position:"absolute", ml:"24rem", mt:"8rem", p:"0.2rem"}}>
                <MenuList >
                {users.map((usr,i) => {
                  return (
                    
                    <Box 
                      backgroundColor={alt}
                      sx={{"&:hover": {cursor: "pointer"}}}
                      onClick={() => {navigate(`/profile/${usr._id}`); navigate(0)}}
                      display= "flex"
                      justifyContent= "start"
                      >
                    <UserProfilePicture picturePath= {usr.picturePath} size="55px"/>
                    <MenuItem 
                      key={i}
                      sx={{"&:hover": {backgroundColor: "#00000000"}}}
                    >
                      
                      <ListItemText
                        
                        primary={`${usr.firstName} ${usr.lastName}`}
                        secondary={`@${usr.firstName}${usr.lastName}`}
                      />
                    </MenuItem>
                    
                    </Box>
                   
                  )
                })}
           
              </MenuList>
              </WrapperCSS>
              )
            }
         
        <FlexCSS gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton><Message sx={{ fontSize: "25px",color: dark }}/></IconButton>
          
          <IconButton><Notifications sx={{ fontSize: "25px",color: dark }}/></IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem onClick={() => {navigate(`/profile/${user._id}`); navigate(0)}} value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
          </FormControl>
        </FlexCSS>

    </FlexCSS>
  );
};

export default NavigationBar;
