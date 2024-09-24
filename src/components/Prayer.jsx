import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CardActionArea from "@mui/material/CardActionArea";

const Prayer = ({ name, time, img }) => {
  return (
    <Card sx={{ minWidth: "13vw", mt: 2 }}>
      <CardActionArea>
        <CardMedia component="img" height="80" image={img} alt="" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "Lemonada" }}
          >
            {name}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "text.secondary",
              fontFamily: "Lemonada",
              fontWeight: "300 ",
            }}
          >
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Prayer;
