import logo from "../../logo.svg"
import {
  Box,
  IconButton,
  InputBase,
  Select,
  Typography,
  MenuItem,
  FormControl,
  useTheme
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

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName} ${user.lastName}`;

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
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexCSS>
        
         
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
