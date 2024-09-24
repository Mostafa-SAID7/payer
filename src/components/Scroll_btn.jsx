import { Navigation } from "@mui/icons-material";
import { Fab, useScrollTrigger, Zoom } from "@mui/material";

const Scroll_btn = () => {
  return (
    <Zoom in={useScrollTrigger({threshold:100})}>
      <Fab onClick={()=>{
        window.scrollTo(0,0);
      }}
        size="small"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        variant="circular"
        color="primary"
        aria-label="add"
      >
        <Navigation />
      </Fab>
    </Zoom>
  );
};

export default Scroll_btn;
