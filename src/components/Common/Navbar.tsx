import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/router";

import NavDrawer from "./NavDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";

type NavbarProps = {
  logo?: boolean;
  tabs: { text: string; url: string }[];
  title?: string;
  url?: string;
  misc?: React.ReactNode;
};

export default function Navbar(props: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const isSmall = useMediaQuery("(max-width:1040px)");
  const user = useUserContext()?.user;

  const handleOpenNavDrawer = () => {
    setIsOpen(true);
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
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box mr={4}>
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
          <NavDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
          <Box sx={{ flexGrow: 0 }}>
            <Link
              href={props.url || ""}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography variant="subtitle1">{props.title}</Typography>
            </Link>
          </Box>
          {props.logo && <Logo />}
          <NavLinks
            handleClick={handleMenuItemClick}
            tabs={isSmall ? [] : props.tabs}
          />

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {props.misc}
            <Tooltip title={user?.username}>
              <IconButton sx={{ p: 0, ml: 3 }}>
                <Avatar
                  alt="Profile Image"
                  src="https://th.bing.com/th/id/OIP.N8EwSZlfSY6jardurn1rFAHaEK?w=295&h=180&c=7&r=0&o=5&pid=1.7"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <NavLinks
          handleClick={handleMenuItemClick}
          tabs={!isSmall ? [] : props.tabs}
        />
      </Container>
    </AppBar>
  );
}

function Logo() {
  return (
    <Box
      component="a"
      href="/"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
      >
        E-CLASS
      </Typography>
    </Box>
  );
}

function NavLinks(props: {
  tabs: { text: string; url: string }[];
  handleClick: (url: string) => void;
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {props.tabs.map((navItem) => (
        <Button
          key={navItem.text}
          onClick={() => props.handleClick(navItem.url)}
          sx={{ px: 3, py: 2, color: "white", display: "block" }}
        >
          {navItem.text}
        </Button>
      ))}
    </Box>
  );
}
