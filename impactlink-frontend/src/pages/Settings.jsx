import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { fadeUp, gpuStyles, cardHover, buttonTap, scaleIn, slideDown } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { Bell, Moon, Trash2, Shield, AlertTriangle } from "lucide-react";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/reactbits/FadeIn";

const Settings = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        darkMode: false,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Delete account state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/user/profile");
            if (res.data.settings) {
                setSettings(res.data.settings);
            }
        } catch (err) {
            setMessage({ type: "danger", text: "Failed to load settings." });
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (key) => {
        const updated = { ...settings, [key]: !settings[key] };
        setSettings(updated);
        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            await api.put("/user/settings", updated);
            setMessage({ type: "success", text: "Settings saved!" });
            setTimeout(() => setMessage({ type: "", text: "" }), 2000);
        } catch (err) {
            // Revert on error
            setSettings(settings);
            setMessage({ type: "danger", text: "Failed to save settings." });
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!deletePassword) {
            setMessage({ type: "danger", text: "Password is required to delete your account." });
            return;
        }
        setDeleting(true);

        try {
            await api.delete("/user/account", { data: { password: deletePassword } });
            logout();
            navigate("/");
        } catch (err) {
            setMessage({ type: "danger", text: err.response?.data?.error || "Failed to delete account." });
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    return (
        <PageTransition className="page-container py-5 mt-2">
            <div className="container" style={{ maxWidth: "800px" }}>
                <m.div
                    className="mb-5"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="display-6 fw-bold mb-2">Settings</h2>
                    <p className="text-muted">Manage your preferences and account security.</p>
                </m.div>

                {message.text && (
                    <m.div
                        className={`alert alert-${message.type} mb-4`}
                        role="alert"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {message.text}
                    </m.div>
                )}

                {/* Notifications */}
                <FadeIn>
                    <div className="custom-card p-4 p-md-5 mb-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <Bell size={20} className="text-primary" /> Notifications
                        </h5>

                        <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                            <div>
                                <h6 className="fw-bold mb-1">Email Notifications</h6>
                                <p className="text-muted small mb-0">
                                    Receive updates about campaigns you support and your own campaigns.
                                </p>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggle("emailNotifications")}
                                    style={{ width: "3em", height: "1.5em", cursor: "pointer" }}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div>
                                <h6 className="fw-bold mb-1">Dark Mode</h6>
                                <p className="text-muted small mb-0">
                                    Switch between light and dark themes. (Coming soon)
                                </p>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={settings.darkMode}
                                    onChange={() => handleToggle("darkMode")}
                                    style={{ width: "3em", height: "1.5em", cursor: "pointer" }}
                                />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Security */}
                <FadeIn delay={0.1}>
                    <div className="custom-card p-4 p-md-5 mb-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <Shield size={20} className="text-primary" /> Security
                        </h5>

                        <div className="d-flex justify-content-between align-items-center py-3">
                            <div>
                                <h6 className="fw-bold mb-1">Password</h6>
                                <p className="text-muted small mb-0">
                                    Change your password from the Profile page.
                                </p>
                            </div>
                            <a href="/profile" className="btn-outline-custom px-3 py-2 text-decoration-none">
                                Go to Profile
                            </a>
                        </div>
                    </div>
                </FadeIn>

                {/* Danger Zone */}
                <FadeIn delay={0.2}>
                    <div className="custom-card p-4 p-md-5 border-danger border-opacity-25">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 text-danger">
                            <AlertTriangle size={20} /> Danger Zone
                        </h5>

                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fw-bold mb-1">Delete Account</h6>
                                <p className="text-muted small mb-0">
                                    Permanently delete your account and all associated data. This cannot be undone.
                                </p>
                            </div>
                            <m.button
                                className="btn btn-outline-danger px-3 py-2 d-flex align-items-center gap-2"
                                onClick={() => setShowDeleteModal(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Trash2 size={16} /> Delete
                            </m.button>
                        </div>

                        {/* Delete Confirmation */}
                        <AnimatePresence>
                            {showDeleteModal && (
                                <m.div
                                    className="mt-4 p-4 bg-danger bg-opacity-10 rounded"
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="fw-bold text-danger mb-3">
                                        Are you sure? This action is irreversible.
                                    </p>
                                    <div className="mb-3">
                                        <label className="label-custom">Enter your password to confirm</label>
                                        <input
                                            type="password"
                                            className="input-custom"
                                            placeholder="••••••••"
                                            value={deletePassword}
                                            onChange={(e) => setDeletePassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-danger d-flex align-items-center gap-2"
                                            onClick={handleDeleteAccount}
                                            disabled={deleting}
                                        >
                                            {deleting ? (
                                                <><div className="spinner-border spinner-border-sm" role="status"></div> Deleting...</>
                                            ) : (
                                                <><Trash2 size={16} /> Delete My Account</>
                                            )}
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setDeletePassword("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                </FadeIn>
            </div>
        </PageTransition>
    );
};

export default Settings;
