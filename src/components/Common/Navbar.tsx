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
import MailIcon from "@mui/icons-material/Mail";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

const menuItemsList = [
  [
    { text: "Inbox", icon: <InboxIcon />, url: "/inbox" },
    { text: "Starred", icon: <MailIcon />, url: "/starred" },
    { text: "Send Email", icon: <InboxIcon />, url: "/send-email" },
    { text: "Drafts", icon: <MailIcon />, url: "/drafts" },
  ],
  [
    { text: "All Mails", icon: <InboxIcon />, url: "/all-mails" },
    { text: "Trash", icon: <MailIcon />, url: "/trash" },
    { text: "Spam", icon: <InboxIcon />, url: "/spam" },
  ],
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const matchesMd = useMediaQuery("(min-width:900px)");
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
          <NavDrawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleMenuItemClick={handleMenuItemClick}
            menuItemsList={matchesMd ? [menuItemsList[1]] : menuItemsList}
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
