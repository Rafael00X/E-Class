import AssignmentCard from "@/components/Classroom/AssignmentCard";
import ClassroomLayout from "@/components/Layout/ClassroomLayout";
import { classroomRepository } from "@/database/";
import { Assignment, assignmentMapper } from "@/types/assignment";
import { Classroom } from "@/types/classroom";
import { userPreviewMapper } from "@/types/user";
import { Typography } from "@mui/material";
import { GetServerSideProps } from "next";

type AssignmentPageProps = {
  classroom: Classroom;
};

export default function AssignmentsPage(props: AssignmentPageProps) {
  const classroom = props.classroom;
  const assignmentsWithTags: { [key: string]: Assignment[] } = {};
  const assignmentsWithoutTags: Assignment[] = [];
  classroom.assignments?.forEach((assignment) => {
    const tag = assignment.tag;
    if (!tag) assignmentsWithoutTags.push(assignment);
    else if (assignmentsWithTags[tag])
      assignmentsWithTags[tag].push(assignment);
    else assignmentsWithTags[tag] = [assignment];
  });
  return (
    <ClassroomLayout title={classroom.name} classroomId={classroom.id}>
      <div style={{ marginBottom: 25 }}>
        {assignmentsWithoutTags.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
      {Object.entries(assignmentsWithTags).map(([name, assignments]) => {
        const cards = assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ));
        return (
          <div key={name} style={{ marginBottom: 25 }}>
            <Typography
              variant="h4"
              borderBottom={"1px solid"}
              sx={{ mb: 5, pb: 3 }}
            >
              {name}
            </Typography>
            {cards}
          </div>
        );
      })}
    </ClassroomLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const classroomId = context.params?.classroomId as string;
  const result = await classroomRepository.getClassroomById(classroomId);
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

  return {
    props: {
      classroom,
    },
  };
};
