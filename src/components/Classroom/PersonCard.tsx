import { Card, CardContent, Box, Avatar, Typography } from "@mui/material";

export default function PersonCard(props: {
  user: { id: string; username: string };
}) {
  return (
    <Card sx={{ boxShadow: 0 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ ml: 2, mr: 4 }}>
          <Avatar />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: "bold" }}>
            {`${props.user.username}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
