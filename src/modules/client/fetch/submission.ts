export const createSubmission = async (
  work: string[],
  assignmentId: string
) => {
  const res = await fetch("/api/submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ work, assignmentId }),
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};

export const deleteSubmission = async (submissionId: string) => {
  const res = await fetch(`/api/submissions`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ submissionId }),
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  return true;
};

export const getSubmission = async (assignmentId: string) => {
  const res = await fetch(`/api/submissions?assignmentId=${assignmentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};
