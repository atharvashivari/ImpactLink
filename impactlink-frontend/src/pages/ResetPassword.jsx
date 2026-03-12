import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { scaleIn, fadeUp, fadeLeft, fadeRight, buttonTap, gpuStyles } from "../utils/animations";
import api from "../utils/api";
import { Lock, CheckCircle } from "lucide-react";
import PageTransition from "../components/PageTransition";

const ResetPassword = () => {
    const { userId, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await api.post(`/auth/reset-password/${userId}/${token}`, { password });
            setSuccess(true);
            // Redirect to login after 3 seconds
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to reset password. The link may have expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition className="auth-container">
            <m.div className="auth-card" style={{ maxWidth: "440px", ...gpuStyles }} variants={scaleIn} initial="hidden" animate="visible">
                <AnimatePresence mode="wait">
                    {!success ? (
                        <m.div key="form" variants={fadeLeft} initial="hidden" animate="visible" exit="hidden" style={gpuStyles}>
                            <div className="text-center mb-4">
                                <m.div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-3"
                                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.15, type: "spring", stiffness: 250, damping: 20 }}
                                    style={gpuStyles}
                                >
                                    <Lock size={32} />
                                </m.div>
                                <h3 className="fw-bold mb-2">Set New Password</h3>
                                <p className="text-muted small">
                                    Enter your new password below. Make sure it's at least 6 characters.
                                </p>
                            </div>

                            {error && (
                                <m.div className="alert alert-danger py-2" variants={fadeUp} initial="hidden" animate="visible" style={gpuStyles}>
                                    {error}
                                </m.div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="label-custom">New Password</label>
                                    <input
                                        type="password"
                                        className="input-custom"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="label-custom">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="input-custom"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <m.button type="submit" className="btn-primary-custom w-100 py-3" disabled={loading} {...buttonTap}>
                                    {loading ? (
                                        <><div className="spinner-border spinner-border-sm me-2" role="status"></div> Resetting...</>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </m.button>
                            </form>
                        </m.div>
                    ) : (
                        <m.div key="success" className="text-center" variants={fadeRight} initial="hidden" animate="visible" exit="hidden" style={gpuStyles}>
                            <m.div className="bg-success bg-opacity-10 text-success d-inline-flex p-3 rounded-circle mb-3"
                                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 20 }}
                                style={gpuStyles}
                            >
                                <CheckCircle size={32} />
                            </m.div>
                            <h3 className="fw-bold mb-2">Password Reset!</h3>
                            <p className="text-muted mb-4">
                                Your password has been changed successfully. Redirecting you to login...
                            </p>
                            <Link to="/login" className="btn-primary-custom w-100 py-3 text-center d-block text-decoration-none">
                                Go to Login
                            </Link>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>
        </PageTransition>
    );
};

export default ResetPassword;
