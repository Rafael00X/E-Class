import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ProfileCard from "./ProfileCard";

type DrawerMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleMenuItemClick: (url: string) => void;
  menuItemsList: { text: string; icon: JSX.Element; url: string }[][];
};

export default function NavDrawer(props: DrawerMenuProps) {
  const { isOpen, setIsOpen, handleMenuItemClick, menuItemsList } = props;

  const handleLogout = () => {
    // TODO
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const list = (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ProfileCard />
      <Divider />
      {menuItemsList.map((menuItems, index1) => {
        return (
          <React.Fragment key={index1}>
            <List>
              {menuItems.map((menuItem, index2) => {
                return (
                  <ListItem key={index2} disablePadding>
                    <ListItemButton
                      onClick={() => handleMenuItemClick(menuItem.url)}
                    >
                      <ListItemIcon>{menuItem.icon}</ListItemIcon>
                      <ListItemText primary={menuItem.text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <PowerSettingsNewIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </React.Fragment>
        );
      })}
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
