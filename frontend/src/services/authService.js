import api from "./api.js";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data.data.admin;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getCurrentAdmin = async () => {
  const response = await api.get("/auth/me");
  return response.data.data.admin;
};
