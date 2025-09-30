import axios from "axios";

const token = import.meta.env.VITE_TMDB_TOKEN;
if (!token) console.warn("VITE_TMDB_TOKEN is missing. Check your .env");
export const http = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json;charset=utf-8",
  },
});
