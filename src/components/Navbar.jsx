import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Avatar, Button, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { resetTokens } from "../store/authSlice";

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    // Implement your logout logic here
    dispatch(resetTokens());
    handleMenuClose();
  };

  const handleGalleryClick = () => {
    handleMenuClose();
    navigate("/gallery");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate("/")}>
          Cats AI
        </Typography>
        {accessToken ? (
          <>

            <Avatar onClick={handleMenuOpen}>
              <AccountCircle />
            </Avatar>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleGalleryClick}>Gallery</MenuItem>

              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button onClick={() => navigate("/login")} color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
