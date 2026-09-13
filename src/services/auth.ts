import api from "./api";
import type { login } from "@/types/auth";

export default async function userlogin(data: login) {
     const res = await api.post("/auth/login", data);

     return res.data;
}

export async function getCurrentUser() {
     const response = await api.get("/auth/me");
     return response.data;
}
export async function logoutUser() {
     await api.post("/auth/logout");
}