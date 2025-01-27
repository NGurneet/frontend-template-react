import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import Logo from "../Logo";
import MenuItem from "../MenuItem";
import HamburgerMenu from "../HamburgerMenu";

const Navbar: React.FC = () => {
  const menuItems = ["Home", "About", "Services", "Contact"];

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1a1a1a" }}>
      <Toolbar>
        {/* Logo */}
        <Logo />

        {/* Menu Items */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} label={item} />
          ))}
        </Box>

        {/* Hamburger Menu for Mobile */}
        <HamburgerMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
