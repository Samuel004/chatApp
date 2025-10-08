import { chatStore } from "../src/store/chatStore.js";
import { useEffect, useRef } from "react";
import CryptoJS from "crypto-js";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../components/skeleton/MessageSkeleton.jsx";
import { useAuthStore } from "../src/store/useAuthStore.js";

import { Trophy } from "lucide-react";


const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = chatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    const secretKey =import.meta.env.VITE_APP_SECRET_KEY;

    const decryptMessage = (encryptedText) => {
        try{
            const bytes = CryptoJS.AES.decrypt(encryptedText,secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return decrypted || "[decryption failed]";
        }catch(err){
            console.error("Decryption Error:",err);
            return "[Error Decrypting]";
        }
    };

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic || "/avatar.png"
                                            : selectedUser.profilePic || "/avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>

                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{decryptMessage(message.text)}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    );
};
export default ChatContainer;