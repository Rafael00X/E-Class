import { ChangeEvent, FormEvent, useState } from "react";

const initialState = {
  className: "",
  classroomId: "",
};

export default function AddClassroomForm() {
  const [values, setValues] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  const handleAddSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/classroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.className,
      }),
    });
  };
  const handleEnrollSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/classroom?task=enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classroomId: values.classroomId,
      }),
    });
  };

  return (
    <>
      <form onSubmit={handleAddSubmit}>
        <label htmlFor="className">Name:</label>
        <input
          type="text"
          name="className"
          onChange={handleChange}
          value={values.className}
        />
        <input type="submit" value="Add" />
      </form>
      <form onSubmit={handleEnrollSubmit}>
        <label htmlFor="classroomId">Classroom ID:</label>
        <input
          type="text"
          name="classroomId"
          onChange={handleChange}
          value={values.classroomId}
        />
        <input type="submit" value="Enroll" />
      </form>
    </>
  );
}
