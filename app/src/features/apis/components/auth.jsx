import axios from "axios";

const API_URL = "https://api-de-gastos.onrender.com";

export const registerUser = (data) =>
  axios.post(`${API_URL}/api/auth/register`, data);

export const loginUser = (data) =>
  axios.post(`${API_URL}/api/auth/login`, data);

export const forgotPassword = (data) =>
  axios.post(`${API_URL}/api/auth/forgot-password`, data);