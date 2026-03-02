import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const adminToken = localStorage.getItem("adminToken");
            if (adminToken) {
                navigate("/admin/admindashboard", { replace: true });
            }
            setIsChecking(false);
        };

        // Only check once when component mounts
        checkAuth();
    }, [navigate]); // Add navigate to dependency array

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/admin/login", {
                username,
                password,
            });

            if (response.data.token) {
                localStorage.setItem("adminToken", response.data.token);
                navigate("/admin/admindashboard", { replace: true });
            }
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    if (isChecking) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border" role="status"></div>
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 className="text-center fw-bold mb-4">Admin Login</h3>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="label-custom">Username</label>
                        <input
                            type="text"
                            className="input-custom"
                            placeholder="admin"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label-custom">Password</label>
                        <input
                            type="password"
                            className="input-custom"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary-custom w-100 mt-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
