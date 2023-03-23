import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Facebook, Instagram, GitHub, Google } from "@mui/icons-material";


function Footer() {

  return (
    <AppBar position="static" sx={{
      top: "auto",
      bottom: 0,
      backgroundColor: '#1976d2',
    }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: "space-between",
      }}>
        <Box>
          <Typography variant="subtitle1">
            © {new Date().getFullYear()} &nbsp; 𝕄𝕐 🅱🅻🅾🅶 &nbsp;
          </Typography>
        </Box>

        <Box>
          <IconButton aria-label="Facebook" href="https://www.facebook.com">
            <Facebook />
          </IconButton>
          <IconButton aria-label="Instagram" href="https://www.instagram.com">
            <Instagram />
          </IconButton>
          <IconButton aria-label="GitHub" href="https://github.com">
            <GitHub />
          </IconButton>
          <IconButton aria-label="Google" href="https://www.google.com">
            <Google />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Footer;
