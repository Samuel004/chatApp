import { useState } from "react";
import { useAuthStore } from "../src/store/useAuthStore.js";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
            <div className="w-full max-w-md bg-black/70 border border-purple-700 rounded-2xl p-8 shadow-[0_0_30px_rgba(147,51,234,0.4)] backdrop-blur-lg animate-fade-in">

                <div className="text-center mb-6">
                    <div className="flex flex-col items-center gap-2">

                        <h1 className="text-3xl font-bold mt-2 text-white">Welcome Back</h1>
                        <p className="text-purple-300 text-sm">Sign in to your account</p>
                    </div>
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 transition"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>


                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 text-white placeholder-purple-300 border border-transparent focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 transition"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-purple-400" />
                            ) : (
                                <Eye className="h-5 w-5 text-purple-400" />
                            )}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>
                </form>


                <div className="text-center mt-6 text-sm text-purple-200">
                    Don't have an account?{" "}
                    <Link to="/signup" className="underline hover:text-purple-100 transition">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
