import { Classroom } from "@/types/classroom";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

export default function AnnouncementForm(props: { classroom: Classroom }) {
  return (
    <Card variant="outlined" sx={{ boxShadow: 3 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={props.classroom.name}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0uVr0nP7iSipZ5MWgCk6xKpw9VAOW7daKNw&usqp=CAU"
          sx={{ mr: 2 }}
        />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          Announce something to the class
        </Typography>
      </CardContent>
    </Card>
  );
}
