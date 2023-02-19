import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Classroom } from "@/types/classroom";
import { useRouter } from "next/router";

type ClassPreviewCardProps = {
  classroom: Classroom;
};

export default function ClassPreviewCard(props: ClassPreviewCardProps) {
  const { name, id } = props.classroom;
  const router = useRouter();
  const handleClick = () => router.push("/classrooms/" + id);
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0uVr0nP7iSipZ5MWgCk6xKpw9VAOW7daKNw&usqp=CAU"
          alt="green iguana"
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
