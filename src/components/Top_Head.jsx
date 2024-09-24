import { useContext, useState } from "react";
import { ColorModeContext } from "../theme";
import {
  IconButton,
  useTheme,
  Box,
  Typography,
  Stack,
  List,
  ListItemText,
  MenuItem,
  Menu,
  ListItem,
  Container,
  
} from "@mui/material";
import {
  DarkModeOutlined,
  ExpandMore,
  LightModeOutlined,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const options = ["AR", "EN"];

const Top_Head = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState (null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
       
        background: " rgba(9,121,16,1)100% ",
      }}
    >
     <Container>
     <Stack direction={"row"} alignItems={"center"}>
        <Typography
          sx={{
            mr: 2,
            p: "3px 10px",
            bgcolor: "#D23f57",
            borderRadius: "12px",
            fontSize: "10px",
            fontWeight: "bold",
            color: "#fff",
          }}
          variant="body2"
        >
          HOT
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 300,
            color: "#fff",
            fontFamily:"revert-layer"
          }}
          variant="body2"
        >
          Azan Prayer
        </Typography>
        <Box flexGrow={1} />

        <div>
          {theme.palette.mode === "light" ? (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                colorMode.toggleColorMode();
              }}
              color="inherit"
            >
              <LightModeOutlined sx={{ fontSize: "16px " ,color:"orange"}} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                colorMode.toggleColorMode();
              }}
              color="inherit"
            >
              <DarkModeOutlined sx={{ fontSize: "16px " }} />
            </IconButton>
          )}
        </div>

        <List component="nav" aria-label="Device settings" sx={{p:0,m:0}}>
          <ListItem
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
            sx={{ "&:hover": { cursor: "pointer" },px:1 }}
          >
            <ListItemText
              sx={{ ".MuiTypography-root": { fontSize: "10px",color:"#fff" } }}
              secondary={options[selectedIndex]}
            />
            <ExpandMore sx={{color:"#fff"}} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              sx={{ fontSize: "11px", p: "3px 10px", minHeight: "10px" }}
              key={option}
             
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <FacebookIcon sx={{ fontSize: "16px", color: "#fff", mr: 1 }} />
        <TwitterIcon sx={{ fontSize: "16px", color: "#fff", mr: 1 }} />
        <InstagramIcon sx={{ fontSize: "16px", color: "#fff", mr: 1 }} />
      </Stack>
     </Container>
    </Box>
  );
};

export default Top_Head;
