import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";

export default function ProfileCard() {
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
