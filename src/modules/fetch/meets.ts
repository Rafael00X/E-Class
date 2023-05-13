export const createMeet = async (
  description: string,
  url: string,
  classroomId: string
) => {
  const res = await fetch("/api/meets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, url, classroomId }),
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};

export const deleteMeet = async (meetId: string) => {
  const res = await fetch(`/api/meets`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ meetId }),
  });
  if (res.status === 401) throw new Error("Not authorized");
  if (!res.ok) throw new Error("Server error");
  return true;
};
