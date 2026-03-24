import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../api/axios.js";
import { atelierToast } from "../utils/Toaster";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 1. Prevent page refresh
    setLoading(true);
    try {
      // This will now send the actual email address
      await API.post("/auth/forgotpassword", { email });
      atelierToast("Password reset email sent successfully!");
      setEmailSent(true); // 2. Show the success state UI
    } catch (error) {
      atelierToast("Failed to send password reset email.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-atelier-paper min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        {/* Back to Login */}
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity mb-12"
        >
          <ArrowLeft size={14} /> Back to Login
        </Link>

        {!emailSent ? (
          <>
            <div className="mb-12">
              <h1 className="text-3xl font-serif italic mb-4">
                Restore Access
              </h1>
              <p className="text-sm font-serif italic opacity-60 leading-relaxed">
                Enter the email address associated with your account. We will
                send you a secure link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label className="text-[9px] tracking-[0.3em] uppercase block mb-2 opacity-50 font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  // 3. Link the input to your state
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:border-atelier-ink outline-none transition-colors font-serif italic placeholder:opacity-20"
                />
              </div>

              <button
                type="submit" // Ensure type is submit
                disabled={loading}
                className="w-full bg-atelier-ink text-white py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-atelier-tan transition-all duration-700 disabled:opacity-50"
              >
                {loading ? "Dispatching..." : "Send Recovery Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 border border-atelier-ink/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-6 h-6 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-serif italic mb-4">Link Dispatched</h1>
            <p className="text-sm font-serif italic opacity-60 leading-relaxed mb-8">
              If an account exists for that email, you will receive instructions
              shortly. Please check your spam folder if it does not arrive.
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="text-[10px] tracking-widest uppercase border-b border-atelier-ink/20 pb-1 opacity-60 hover:opacity-100"
            >
              Try another email
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
