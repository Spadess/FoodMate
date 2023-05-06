import { Box, Typography, useTheme} from "@mui/material";
import Form from "../components/Form.jsx";
import logo from "../logo.png"

const LoginPage = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{display: "flex", width: "15%", height: "15vh"}}
        m="0rem auto"
      >
        <img 
          style={{ objectFit: "cover", width: "100%" }}
          src={logo}
          alt="logo"
        />
        
      </Box>

      <Box
        width="50%"
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        textAlign="center"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to FoodMate, the place where gourmets gather!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
