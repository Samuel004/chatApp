import { useState } from "react";
import { useAuthStore } from "../src/store/useAuthStore.js";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#4f46e5] to-[#9333ea] px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <div className="text-center mb-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-[#4f46e5]" />
                        </div>
                        <h1 className="text-2xl font-bold mt-2 text-gray-800">Your Profile</h1>
                        <p className="text-gray-500 text-sm">Manage your account details</p>
                    </div>
                </div>


                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <img
                            src={selectedImg || authUser.profilePic || "/avatar.png"}
                            alt="Profile"
                            className="size-32 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className={`absolute bottom-0 right-0 bg-[#4f46e5] p-2 rounded-full cursor-pointer transition-all duration-200 group-hover:scale-110 hover:bg-[#4338ca] shadow ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-60" : ""
                                }`}
                        >
                            <Camera className="w-4 h-4 text-white" />
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={isUpdatingProfile}
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-500">
                        {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                    </p>
                </div>


                <div className="space-y-6 mt-6">
                    <div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <User className="w-4 h-4" />
                            Full Name
                        </div>
                        <div className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-gray-800 shadow-sm">
                            {authUser?.fullName}
                        </div>
                    </div>

                    <div>
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </div>
                        <div className="px-4 py-2.5 bg-gray-100 rounded-lg border border-gray-200 text-gray-800 shadow-sm">
                            {authUser?.email}
                        </div>
                    </div>
                </div>


                <div className="mt-6 bg-gray-100 rounded-xl p-3 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Account Status</span>
                        <span className="text-green-600 font-semibold">Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
