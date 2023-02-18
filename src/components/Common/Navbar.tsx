import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import NavDrawer from "./NavDrawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const menuItemsList = [
  [
    { text: "Assignments", icon: <AssignmentIcon />, url: "/assignments" },
    { text: "Routine", icon: <AccessTimeIcon />, url: "/Routine" },
  ],
  [
    { text: "My Activity", icon: <EventIcon />, url: "/my-activity" },
    { text: "Archived Classes", icon: <InboxIcon />, url: "/archived-classes" },
    { text: "Settings", icon: <SettingsIcon />, url: "/settings" },
  ],
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const isMaximized = useMediaQuery("(min-width:900px)");
  const router = useRouter();

  const handleOpenNavDrawer = () => {
    setIsOpen(true);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#222", color: "#eee" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box mr={isMaximized ? 5 : 0}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavDrawer}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <NavDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleMenuItemClick={handleMenuItemClick}
            menuItemsList={isMaximized ? [menuItemsList[1]] : menuItemsList}
          />
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-CLASS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-CLASS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {menuItemsList[0].map((menuItem) => (
              <Button
                key={menuItem.text}
                onClick={() => handleMenuItemClick(menuItem.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {menuItem.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Profile Image"
                  src="https://th.bing.com/th/id/OIP.N8EwSZlfSY6jardurn1rFAHaEK?w=295&h=180&c=7&r=0&o=5&pid=1.7"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
