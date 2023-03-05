import { Card, CardContent, Box, Avatar, Typography } from "@mui/material";

export default function PersonCard(props: {
  user: { id: string; username: string };
}) {
  return (
    <Card sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <CardContent sx={{ display: "flex", alignItems: "center", height: 80 }}>
        <Box sx={{ ml: 2, mr: 4 }}>
          <Avatar />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {`${props.user.username}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
