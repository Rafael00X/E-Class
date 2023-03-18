import * as React from "react";
import Box from "@mui/material/Box";
import { Assignment } from "@/types/assignment";
import { getDateDiff } from "@/utils/dateHelper";
import moment from "moment";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

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

export default function AssignmentsPreviewCard(props: {
  assignments: Assignment[] | undefined;
}) {
  const { assignments } = props;
  const pending = assignments
    ?.filter(
      (assignment) =>
        !!assignment.closedAt &&
        new Date(assignment.closedAt).getTime() > Date.now() &&
        (!assignment.submissions || assignment.submissions.length === 0)
    )
    .sort((a, b) => getDateDiff(a.closedAt!, b.closedAt!))
    .slice(0, 5);
  let curdate = "";
  return (
    <Card variant="outlined" sx={{ width: 320, mb: 5, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Assignments
        </Typography>

        {pending &&
          pending.map((assignment) => {
            const prevdate = curdate;
            curdate = moment(assignment.closedAt, moment.ISO_8601)
              .calendar()
              .split(" ")[0];
            return (
              <React.Fragment key={assignment.id}>
                {prevdate !== curdate && (
                  <>
                    <hr />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {curdate}
                    </Typography>
                  </>
                )}
                <AssignmentLine key={assignment.id} assignment={assignment} />
              </React.Fragment>
            );
          })}
      </CardContent>
      <CardActions>
        <Button size="small">View all</Button>
      </CardActions>
    </Card>
  );
}

function AssignmentLine(props: { assignment: Assignment }) {
  const { assignment } = props;
  const router = useRouter();
  const handleClick = () =>
    router.push(
      `/classrooms/${assignment.classroomId}/assignments/${assignment.id}`
    );
  return (
    <Card raised={false} sx={{ boxShadow: 0, overflow: "hidden" }}>
      <CardActionArea sx={{ p: 1 }} onClick={handleClick}>
        <Typography variant="body2" noWrap>
          {bull} {moment(assignment.closedAt).format("LT")} - {assignment.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
