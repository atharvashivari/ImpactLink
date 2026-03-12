import React, { useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { scaleIn, fadeUp, fadeLeft, fadeRight, buttonTap, gpuStyles } from "../utils/animations";
import api from "../utils/api";
import { Mail, ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/forgot-password", { email });
            setSubmitted(true);
            // In dev mode, Ethereal preview URL may be returned
            if (res.data.previewUrl) {
                setPreviewUrl(res.data.previewUrl);
            }
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition className="auth-container">
            <m.div className="auth-card" style={{ maxWidth: "440px", ...gpuStyles }} variants={scaleIn} initial="hidden" animate="visible">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <m.div key="form" variants={fadeLeft} initial="hidden" animate="visible" exit="hidden" style={gpuStyles}>
                            <div className="text-center mb-4">
                                <m.div className="bg-primary-subtle text-primary d-inline-flex p-3 rounded-circle mb-3"
                                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.15, type: "spring", stiffness: 250, damping: 20 }}
                                    style={gpuStyles}
                                >
                                    <Mail size={32} />
                                </m.div>
                                <h3 className="fw-bold mb-2">Forgot Password?</h3>
                                <p className="text-muted small">
                                    No worries! Enter your email and we'll send you a link to reset your password.
                                </p>
                            </div>

                            {error && (
                                <m.div className="alert alert-danger py-2" variants={fadeUp} initial="hidden" animate="visible" style={gpuStyles}>
                                    {error}
                                </m.div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="label-custom">Email Address</label>
                                    <input
                                        type="email"
                                        className="input-custom"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <m.button type="submit" className="btn-primary-custom w-100 py-3" disabled={loading} {...buttonTap}>
                                    {loading ? (
                                        <><div className="spinner-border spinner-border-sm me-2" role="status"></div> Sending...</>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </m.button>
                            </form>

                            <div className="text-center mt-4">
                                <Link to="/login" className="text-muted small d-inline-flex align-items-center gap-1 text-decoration-none">
                                    <ArrowLeft size={14} /> Back to Login
                                </Link>
                            </div>
                        </m.div>
                    ) : (
                        <m.div key="success" className="text-center" variants={fadeRight} initial="hidden" animate="visible" exit="hidden" style={gpuStyles}>
                            <m.div className="bg-success bg-opacity-10 text-success d-inline-flex p-3 rounded-circle mb-3"
                                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 250, damping: 20 }}
                                style={gpuStyles}
                            >
                                <Mail size={32} />
                            </m.div>
                            <h3 className="fw-bold mb-2">Check Your Email</h3>
                            <p className="text-muted mb-4">
                                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
                                It will expire in 1 hour.
                            </p>

                            {previewUrl && (
                                <div className="alert alert-info py-2 text-start small mb-4">
                                    <strong>Dev Mode:</strong> View the email at{" "}
                                    <a href={previewUrl} target="_blank" rel="noreferrer" className="text-primary">
                                        Ethereal Preview
                                    </a>
                                </div>
                            )}

                            <p className="text-muted small mb-3">Didn't receive it? Check your spam folder or</p>
                            <m.button className="btn-outline-custom w-100" onClick={() => { setSubmitted(false); setPreviewUrl(""); }} {...buttonTap}>
                                Try Again
                            </m.button>

                            <div className="mt-4">
                                <Link to="/login" className="text-muted small d-inline-flex align-items-center gap-1 text-decoration-none">
                                    <ArrowLeft size={14} /> Back to Login
                                </Link>
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>
        </PageTransition>
    );
};

export default ForgotPassword;
