import { Typography, useTheme } from "@mui/material";
import FlexCSS from "components/FlexCSS";
import WrapperCSS from "components/WrapperCSS";

const Advertisement = ({adPublisher, description, adPicture}) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;

  return (
    <WrapperCSS mb="2rem">
      <FlexCSS >
        <Typography color={dark} variant="h5" fontWeight="500" align="center" >
          {adPublisher}
        </Typography>
        <Typography color={main}>
          Sponsored
        </Typography>
      </FlexCSS>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`http://localhost:3001/pictures/${adPicture}`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Typography align="center" color={dark} m="0.5rem 0">
        {description}
      </Typography>
    </WrapperCSS>
  );
};

export default Advertisement;
