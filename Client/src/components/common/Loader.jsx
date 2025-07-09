const Loader = ({ size = "default", color = "blue" }) => {
    const sizeClasses = {
        small: "w-5 h-5 border-2",
        default: "w-10 h-10 border-4",
        large: "w-16 h-16 border-4",
    };

    const colorClasses = {
        blue: "border-blue-600 border-t-transparent",
        white: "border-white border-t-transparent",
        purple: "border-purple-600 border-t-transparent",
    };

    return (
        <div className="flex justify-center items-center py-10">
            <div
                className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
            ></div>
        </div>
    );
};

export default Loader;
