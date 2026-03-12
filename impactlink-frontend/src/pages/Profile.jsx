import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import { fadeUp, gpuStyles, cardHover, buttonTap } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { User, Mail, Phone, FileText, Camera, Lock, Save } from "lucide-react";
import PageTransition from "../components/PageTransition";
import FadeIn from "../components/reactbits/FadeIn";

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await api.get("/user/profile");
            setProfile(res.data);
        } catch (err) {
            setMessage({ type: "danger", text: "Failed to load profile." });
        } finally {
            setLoading(false);
        }
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: "", text: "" });

        try {
            const res = await api.put("/user/profile", {
                name: profile.name,
                bio: profile.bio,
                phone: profile.phone,
                avatar: profile.avatar,
            });
            updateUser({ id: res.data.user._id, name: res.data.user.name, email: res.data.user.email });
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (err) {
            setMessage({ type: "danger", text: err.response?.data?.error || "Failed to update profile." });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "danger", text: "New passwords do not match." });
            return;
        }
        if (passwordData.newPassword.length < 6) {
            setMessage({ type: "danger", text: "New password must be at least 6 characters." });
            return;
        }

        setChangingPassword(true);
        setMessage({ type: "", text: "" });

        try {
            await api.put("/user/change-password", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            setMessage({ type: "success", text: "Password changed successfully!" });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            setMessage({ type: "danger", text: err.response?.data?.error || "Failed to change password." });
        } finally {
            setChangingPassword(false);
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
                    <h2 className="display-6 fw-bold mb-2">My Profile</h2>
                    <p className="text-muted">Manage your account information and security.</p>
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

                {/* Profile Info Card */}
                <FadeIn>
                    <div className="custom-card p-4 p-md-5 mb-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <User size={20} className="text-primary" /> Personal Information
                        </h5>

                        <form onSubmit={handleSaveProfile}>
                            {/* Avatar */}
                            <div className="text-center mb-4">
                                <div className="position-relative d-inline-block">
                                    <m.div
                                        className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{ width: "100px", height: "100px", fontSize: "2.5rem", overflow: "hidden" }}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.4, type: "spring" }}
                                    >
                                        {profile?.avatar ? (
                                            <img src={profile.avatar} alt="Avatar" className="w-100 h-100 object-fit-cover" />
                                        ) : (
                                            profile?.name?.charAt(0)?.toUpperCase() || "U"
                                        )}
                                    </m.div>
                                </div>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="label-custom">
                                        <User size={14} className="me-1" /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="input-custom"
                                        value={profile?.name || ""}
                                        onChange={handleProfileChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="label-custom">
                                        <Mail size={14} className="me-1" /> Email
                                    </label>
                                    <input
                                        type="email"
                                        className="input-custom bg-light"
                                        value={profile?.email || ""}
                                        disabled
                                    />
                                    <small className="text-muted">Email cannot be changed.</small>
                                </div>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="label-custom">
                                        <Phone size={14} className="me-1" /> Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input-custom"
                                        placeholder="+1 (555) 000-0000"
                                        value={profile?.phone || ""}
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="label-custom">
                                        <Camera size={14} className="me-1" /> Upload Avatar
                                    </label>
                                    <input
                                        type="file"
                                        className="input-custom form-control"
                                        accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            
                                            const formData = new FormData();
                                            formData.append("image", file);
                                            
                                            try {
                                                setMessage({ type: "info", text: "Uploading avatar..." });
                                                const res = await api.post("/upload/avatar", formData, {
                                                    headers: { "Content-Type": "multipart/form-data" }
                                                });
                                                setProfile({ ...profile, avatar: api.defaults.baseURL.replace('/api', '') + res.data.url });
                                                setMessage({ type: "success", text: "Avatar uploaded! Click Save Changes to confirm." });
                                            } catch (err) {
                                                console.error(err);
                                                setMessage({ type: "danger", text: "Failed to upload avatar." });
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="label-custom">
                                    <FileText size={14} className="me-1" /> Bio
                                </label>
                                <textarea
                                    name="bio"
                                    className="input-custom"
                                    rows="3"
                                    placeholder="Tell us about yourself..."
                                    value={profile?.bio || ""}
                                    onChange={handleProfileChange}
                                    maxLength={500}
                                ></textarea>
                                <small className="text-muted">{(profile?.bio || "").length}/500 characters</small>
                            </div>

                            <m.button
                                type="submit"
                                className="btn-primary-custom d-flex align-items-center gap-2"
                                disabled={saving}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {saving ? (
                                    <><div className="spinner-border spinner-border-sm" role="status"></div> Saving...</>
                                ) : (
                                    <><Save size={18} /> Save Changes</>
                                )}
                            </m.button>
                        </form>
                    </div>
                </FadeIn>

                {/* Change Password Card */}
                <FadeIn delay={0.15}>
                    <div className="custom-card p-4 p-md-5">
                        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                            <Lock size={20} className="text-primary" /> Change Password
                        </h5>

                        <form onSubmit={handleChangePassword}>
                            <div className="mb-4">
                                <label className="label-custom">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    className="input-custom"
                                    placeholder="••••••••"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-md-6">
                                    <label className="label-custom">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="input-custom"
                                        placeholder="••••••••"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="label-custom">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="input-custom"
                                        placeholder="••••••••"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>

                            <m.button
                                type="submit"
                                className="btn-outline-custom d-flex align-items-center gap-2"
                                disabled={changingPassword}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {changingPassword ? (
                                    <><div className="spinner-border spinner-border-sm" role="status"></div> Updating...</>
                                ) : (
                                    <><Lock size={18} /> Update Password</>
                                )}
                            </m.button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </PageTransition>
    );
};

export default Profile;
