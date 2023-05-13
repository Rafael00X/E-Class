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
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import { useRouter } from "next/router";
import { logoutUser } from "@/modules/fetch";

const menuItemsList = [
  [
    { text: "Home", icon: <HomeIcon />, url: "/" },
    { text: "Todo - Review", icon: <AssignmentIcon />, url: "/todo/review" },
    { text: "Todo - Submit", icon: <AccessTimeIcon />, url: "/todo/submit" },
  ],
  [
    { text: "My Activity", icon: <EventIcon />, url: "/my-activity" },
    { text: "Archived Classes", icon: <InboxIcon />, url: "/archived-classes" },
    { text: "Settings", icon: <SettingsIcon />, url: "/settings" },
  ],
];

type DrawerMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function NavDrawer(props: DrawerMenuProps) {
  const { isOpen, setIsOpen } = props;
  const router = useRouter();

  const handleLogout = () => {
    setIsOpen(false);
    logoutUser()
      .then((res) => router.push("/signup"))
      .catch((err) => console.log(err));
  };

  const handleChangeRoute = (url: string) => {
    setIsOpen(false);
    router.push(url);
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

  return (
    <div>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 350 }}
          role="presentation"
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
                      <MenuListItem
                        key={index2}
                        text={menuItem.text}
                        handleClick={() => handleChangeRoute(menuItem.url)}
                        icon={menuItem.icon}
                      />
                    );
                  })}
                </List>
                <Divider />
              </React.Fragment>
            );
          })}
          <List>
            <MenuListItem
              text={"Logout"}
              handleClick={() => handleLogout()}
              icon={<PowerSettingsNewIcon />}
            />
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}

function ProfileCard() {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="Profile Image"
            src="https://th.bing.com/th/id/OIP.N8EwSZlfSY6jardurn1rFAHaEK?w=295&h=180&c=7&r=0&o=5&pid=1.7"
          />
        }
        title="Shrimp and Chorizo Paella"
        subheader="catto234@gmail.com"
      />
    </Card>
  );
}

function MenuListItem(props: {
  text: string;
  icon: JSX.Element;
  handleClick: () => void;
}) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props.handleClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </ListItem>
  );
}
