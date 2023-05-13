import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Meet } from "@prisma/client";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function RoutinePreviewCard(props: { meets: Meet[] }) {
  const { meets } = props;

  return (
    <Card variant="outlined" sx={{ minWidth: 250, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Routine
        </Typography>
        <hr />
        {meets.map((meet) => (
          <MeetLine key={meet.id} meet={meet} />
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">Add</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

function MeetLine(props: { meet: Meet }) {
  const { meet } = props;

  return (
    <Card raised={false} sx={{ boxShadow: 0, overflow: "hidden" }}>
      <CardActionArea sx={{ p: 1 }}>
        <Link href={meet.url} target="_blank">
          <Typography variant="body2" noWrap>
            {bull} {meet.description}
          </Typography>
        </Link>
      </CardActionArea>
    </Card>
  );
}
