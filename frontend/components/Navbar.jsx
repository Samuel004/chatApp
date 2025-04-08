import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../src/store/useAuthStore.js';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {

            if (e.clientY < 60) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-purple-500/30 shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 h-12 sm:h-14 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-all">

                    <span className="font-semibold text-base sm:text-lg bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent hidden sm:block">
                        ChatApp
                    </span>
                </Link>

                {authUser && (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/profile"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-sm hover:opacity-90 transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                        >
                            <User className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Profile</span>
                        </Link>

                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-sm transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                        >
                            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
