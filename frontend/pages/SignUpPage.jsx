import { useState } from "react";
import { useAuthStore } from "../src/store/useAuthStore.js";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) signup(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
            <div className="w-full max-w-md bg-black/70 border border-purple-700 rounded-2xl p-8 shadow-[0_0_30px_rgba(147,51,234,0.4)] backdrop-blur-lg animate-fade-in">
                <div className="text-center mb-6">

                    <h1 className="text-3xl font-bold text-white">Join the Future</h1>
                    <p className="text-purple-300 text-sm mt-1">Sign up & chat in style</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 transition"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>


                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 transition"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>


                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 transition"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>


                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {isSigningUp ? <><Loader2 className="animate-spin" /> Signing up...</> : "Create Account"}
                    </button>
                </form>

                <div className="text-center mt-6 text-sm text-purple-200">
                    Already have an account?{" "}
                    <Link to="/login" className="underline hover:text-purple-100 transition">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
