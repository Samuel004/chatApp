import React from 'react';
import { chatStore } from '../src/store/chatStore.js';
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const HomePage = () => {
    const { selectedUser } = chatStore();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1f0036] via-[#3a0ca3] to-[#7209b7] flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-7xl h-[90vh] bg-white/10 border border-purple-600/50 backdrop-blur-xl rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.3)] transition-all overflow-hidden animate-fade-in">
                <div className="flex h-full rounded-2xl">
                    <Sidebar />
                    {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
