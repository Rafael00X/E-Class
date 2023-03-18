export const createAssignment = async (
  name: string,
  description: string,
  closedAt: Date | null,
  classroomId: string
) => {
  const res = await fetch("/api/assignments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, closedAt, classroomId }),
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};

export const editAssignment = async (
  name: string,
  description: string,
  closedAt: Date | null,
  assignmentId: string
) => {
  const res = await fetch(`/api/assignments/${assignmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, closedAt }),
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const res = await fetch(`/api/assignments/${assignmentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  return true;
};
