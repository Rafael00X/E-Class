import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const date = new Date();
date.setDate(date.getDate() + 2);

const assignments = [
  { name: "Physics homework", deadline: date },
  { name: "Maths assignment", deadline: date },
  { name: "Computer homework", deadline: date },
];

export default function AssignmentsPreviewCard() {
  return (
    <Card sx={{ minWidth: 250, marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Assignments
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Today
        </Typography>
        {assignments.map((assignment) => {
          return (
            <Typography variant="body2">
              {bull} {assignment.name}
            </Typography>
          );
        })}
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">View all</Button>
      </CardActions>
    </Card>
  );
}
