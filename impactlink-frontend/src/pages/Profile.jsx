import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { User, Mail, Phone, FileText, Camera, Lock, Save } from "lucide-react";

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
        <div className="page-container py-5 mt-2">
            <div className="container" style={{ maxWidth: "800px" }}>
                <div className="mb-5">
                    <h2 className="display-6 fw-bold mb-2">My Profile</h2>
                    <p className="text-muted">Manage your account information and security.</p>
                </div>

                {message.text && (
                    <div className={`alert alert-${message.type} mb-4`} role="alert">
                        {message.text}
                    </div>
                )}

                {/* Profile Info Card */}
                <div className="custom-card p-4 p-md-5 mb-4">
                    <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                        <User size={20} className="text-primary" /> Personal Information
                    </h5>

                    <form onSubmit={handleSaveProfile}>
                        {/* Avatar */}
                        <div className="text-center mb-4">
                            <div className="position-relative d-inline-block">
                                <div
                                    className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "100px", height: "100px", fontSize: "2.5rem", overflow: "hidden" }}
                                >
                                    {profile?.avatar ? (
                                        <img src={profile.avatar} alt="Avatar" className="w-100 h-100 object-fit-cover" />
                                    ) : (
                                        profile?.name?.charAt(0)?.toUpperCase() || "U"
                                    )}
                                </div>
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
                                    <Camera size={14} className="me-1" /> Avatar URL
                                </label>
                                <input
                                    type="url"
                                    name="avatar"
                                    className="input-custom"
                                    placeholder="https://example.com/photo.jpg"
                                    value={profile?.avatar || ""}
                                    onChange={handleProfileChange}
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

                        <button type="submit" className="btn-primary-custom d-flex align-items-center gap-2" disabled={saving}>
                            {saving ? (
                                <><div className="spinner-border spinner-border-sm" role="status"></div> Saving...</>
                            ) : (
                                <><Save size={18} /> Save Changes</>
                            )}
                        </button>
                    </form>
                </div>

                {/* Change Password Card */}
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

                        <button type="submit" className="btn-outline-custom d-flex align-items-center gap-2" disabled={changingPassword}>
                            {changingPassword ? (
                                <><div className="spinner-border spinner-border-sm" role="status"></div> Updating...</>
                            ) : (
                                <><Lock size={18} /> Update Password</>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
