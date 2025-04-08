import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-purple-900/10 to-blue-900/10 backdrop-blur-md">
            <div className="max-w-md text-center space-y-6 animate-fade-in-up">

                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.5)] animate-pulse">
                        <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                </div>


                <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Welcome to Chatty!</h2>
                <p className="text-white/70 text-lg">Select a conversation from the sidebar to start chatting</p>
            </div>
        </div>
    );
};

export default NoChatSelected;
