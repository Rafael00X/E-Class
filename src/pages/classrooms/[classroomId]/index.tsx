import { GetServerSideProps } from "next";
import { getClassroomById } from "@/database/repositories/classroom";
import { Classroom } from "@/types/classroom";
import { assignmentMapper } from "@/types/assignment";
import { userPreviewMapper } from "@/types/user";
import AssignmentCard from "@/components/Classroom/AssignmentCard";
import ClassroomLayout from "@/components/Layout/ClassroomLayout";
import { Box, Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import RoutinePreviewCard from "@/components/Home/RoutinePreviewCard";
import AnnouncementForm from "@/components/Classroom/AnnouncementForm";
import AssignmentsPreviewCard from "@/components/Home/AssignmentsPreviewCard";
import { getDateDiff } from "@/utils/dateHelper";
import React from "react";

type ClassroomProps = {
  classroom: Classroom;
};

export default function ClassroomPage(props: ClassroomProps) {
  const { classroom } = props;
  if (!classroom) throw new Error("Classroom not found");
  return (
    <ClassroomLayout title={classroom.name} classroomId={classroom.id}>
      <Box sx={{ maxWidth: "1000px", m: "auto" }}>
        <Box sx={{ p: 1, mb: 2 }}>
          <ImageCard classroom={classroom} />
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: "20px", p: 1, display: { xs: "none", md: "block" } }}>
            <AssignmentsPreviewCard assignments={classroom.assignments} />
            <RoutinePreviewCard />
          </Box>
          <Box sx={{ flexGrow: 1, overflow: "hidden", p: 1 }}>
            <AnnouncementForm classroom={classroom} />
            <br />
            {classroom.assignments?.map((assignment) => {
              return (
                <React.Fragment key={assignment.id}>
                  <AssignmentCard assignment={assignment} />
                  <br />
                </React.Fragment>
              );
            })}
          </Box>
        </Box>
      </Box>
    </ClassroomLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;
  const result = await getClassroomById(classroomId);
  const classroom: Classroom = {
    name: result.name,
    id: result.id,
    students: result.students,
    assignments: result.assignments.map((a) => {
      const assignment = assignmentMapper(a);
      assignment.author = userPreviewMapper(a.author);
      return assignment;
    }),
  };
  classroom.assignments?.sort((a, b) => getDateDiff(b.createdAt, a.createdAt));

  return {
    props: {
      classroom,
    },
  };
};

function ImageCard(props: { classroom: Classroom }) {
  const { classroom } = props;
  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="300"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0uVr0nP7iSipZ5MWgCk6xKpw9VAOW7daKNw&usqp=CAU"
        alt="green iguana"
      />
      <Typography
        variant="h4"
        sx={{ position: "absolute", bottom: "15px", left: "20px" }}
      >
        {classroom.name}
      </Typography>
    </Card>
  );
}
