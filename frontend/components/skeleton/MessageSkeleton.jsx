const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {skeletonMessages.map((_, idx) => (
                <div
                    key={idx}
                    className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
                >
                    <div className="chat-image avatar">
                        <div className="size-10 rounded-full bg-gray-200 animate-pulse" />
                    </div>

                    <div className="chat-header mb-1">
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>

                    <div className="chat-bubble bg-gray-200 bg-opacity-60 p-3 rounded-lg max-w-xs animate-pulse">
                        <div className="h-4 w-3/4 mb-2 bg-gray-300 rounded" />
                        <div className="h-4 w-2/3 bg-gray-300 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
