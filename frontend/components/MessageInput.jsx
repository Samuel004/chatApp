import { useRef, useState } from "react";
import { chatStore } from "../src/store/chatStore.js";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = chatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="p-4 w-full bg-base-100/80 backdrop-blur-md rounded-b-lg shadow-inner">
            {imagePreview && (
                <div className="mb-4 flex items-center gap-3 animate-fade-in-up">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-xl border-2 border-blue-400 shadow-md"
                        />
                        <button
                            onClick={removeImage}
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 input input-md bg-base-200 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-white/60"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`btn btn-circle transition-all duration-200 ease-in-out shadow-md ${imagePreview ? "bg-green-600 text-white hover:bg-green-700" : "bg-base-300 text-zinc-400 hover:text-white hover:bg-zinc-600"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
