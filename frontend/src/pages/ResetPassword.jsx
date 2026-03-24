import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { atelierToast } from "../utils/Toaster";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return atelierToast("Passwords do not match.", "error");
    }

    setLoading(true);
    try {
      await API.put(`/auth/resetpassword/${token}`, { password });
      atelierToast("Password updated successfully.");
      navigate("/auth");
    } catch (error) {
      atelierToast(
        error.response?.data?.message || "Link expired or invalid.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-atelier-paper min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-serif italic mb-4">New Credentials</h1>
          <p className="text-sm font-serif italic opacity-60">
            Establish a new secure password for your archive access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-[9px] tracking-[0.3em] uppercase block mb-2 opacity-50 font-bold">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:border-atelier-ink outline-none transition-colors font-serif italic"
            />
          </div>
          <div>
            <label className="text-[9px] tracking-[0.3em] uppercase block mb-2 opacity-50 font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:border-atelier-ink outline-none transition-colors font-serif italic"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-atelier-ink text-white py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-atelier-tan transition-all duration-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
