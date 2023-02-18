import * as React from "react";
import Grid from "@mui/material/Grid";
import { Classroom } from "@/types/classroom";
import ClassPreviewCard from "./ClassPreviewCard";

type ClassGridProps = {
  classrooms: Classroom[];
};

export default function ClassGrid(props: ClassGridProps) {
  const { classrooms } = props;
  return (
    <Grid container spacing={5}>
      {classrooms.map((classroom, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <ClassPreviewCard classroom={classroom} />
          </Grid>
        );
      })}
    </Grid>
  );
}
