import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:7070/api",

  // Required so the browser sends the HttpOnly
  // authentication cookie with API requests.
  withCredentials: true,

  headers: {
    Accept: "application/json",
  },

  timeout: 30000,
});

export default api;

