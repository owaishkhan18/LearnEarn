import { apiCall } from "./api";

export const teacherSignup = (teacherData) => apiCall("/api/auth/teacherSignup", "POST", teacherData);
export const studentSignup = (studentData) => apiCall("/api/auth/studentSignup", "POST", studentData);
export const LoginUser=(userData)=> apiCall("/api/auth/login","POST",userData);

export const Logout=()=>apiCall("/api/auth/logout","POST")