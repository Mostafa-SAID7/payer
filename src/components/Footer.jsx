import { Box, Button, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box sx={{
      background: " rgba(9,121,16,1)100% ",
    }}>
      
      <Typography 
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        color={"HighlightText"}
        variant="h6"
        sx={{fontSize:18}}
      >
Designed and developed by 
<Button sx={{
    mx:.5,
    fontSize:"18px",
    textTransform:"capitalize",
    color:"#ffe200"

}}
variant="text"
color="primary"
>
M.Said
</Button>

©2024
      </Typography>
    </Box>
  )
}

export default Footer
