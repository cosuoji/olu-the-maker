import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { atelierToast } from "../utils/Toaster";

const Auth = ({ mode = "login" }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(mode === "login");

  // 1. Get both actions from the store
  const login = useUserStore((state) => state.login);
  const register = useUserStore((state) => state.register);

  // 2. Local state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Choose the right action based on mode
    const result = isLogin
      ? await login({ email: formData.email, password: formData.password })
      : await register(formData);

    if (result.success) {
      // Use navigate instead of window.location for a smoother SPA feel
      navigate("/profile");
    } else {
      atelierToast(result.error);
    }
  };

  return (
    <main className="bg-atelier-paper min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif italic mb-2">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-60">
            {isLogin ? "Enter your credentials" : "Join the Atelier"}
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="text-[9px] tracking-widest uppercase block mb-2 opacity-50">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-atelier-ink/20 py-2 focus:border-atelier-ink outline-none transition-colors font-serif italic"
              />
            </div>
          )}

          <div>
            <label className="text-[9px] tracking-widest uppercase block mb-2 opacity-50">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-transparent border-b border-atelier-ink/20 py-2 focus:border-atelier-ink outline-none transition-colors font-serif"
            />
          </div>

          <div>
            <label className="text-[9px] tracking-widest uppercase block mb-2 opacity-50">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-transparent border-b border-atelier-ink/20 py-2 focus:border-atelier-ink outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-atelier-ink text-white py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-atelier-tan transition-colors"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] tracking-widest uppercase border-b border-atelier-ink/20 pb-1 opacity-60 hover:opacity-100 transition-opacity"
          >
            {isLogin ? "Create an Account" : "Already have an account?"}
          </button>

          {isLogin && (
            <div className="block">
              <Link
                to="/forgot-password"
                className="text-[10px] tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity"
              >
                Forgot Password?
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
