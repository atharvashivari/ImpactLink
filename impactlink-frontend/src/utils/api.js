import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor — attach token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle 401/403 (expired/invalid token)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Skip auto-logout for admin routes — admin auth is handled separately
            const isAdminRoute = window.location.pathname.includes("/admin");
            if (!isAdminRoute) {
                // Token expired or invalid — auto-logout
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                // Only redirect if not already on login page
                if (!window.location.pathname.includes("/login")) {
                    window.location.href = "/login";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
export { API_BASE_URL };
