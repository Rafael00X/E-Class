export const loginUser = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (res.status === 401) throw new Error("Invalid credentials");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  if (res.status === 401) throw new Error("Email already registered");
  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  return data;
};
