import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthContext.jsx";

const HeaderNav = ({tab}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(tab);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {logout} = useAuth();
    const [user, setUser] = useState("");

    // Update activeTab when tab prop changes
    useEffect(() => {
        setActiveTab(tab);
    }, [tab]);

    useEffect(() => {
        const getAuthToken = () => {
            const data = sessionStorage.getItem("auth");
            const userData = JSON.parse(data);
            setUser(userData);
        };
        getAuthToken();
    }, []);

    const changeTab = (newTab, link = "/") => {
        setActiveTab(newTab);
        navigate(link);
    };

    return (
        <header className="bg-gray-800 shadow-md rounded-lg mb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <nav className="flex space-x-4">
                        <button
                            onClick={() => changeTab("catalog", "/")}
                            className={`py-2 px-1 border-b-2 transition-colors ${
                                activeTab === "catalog"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-transparent hover:text-gray-300"
                            }`}
                        >
                            Movie Catalog
                        </button>
                        <button
                            onClick={() => changeTab("discussion", "/discussion")}
                            className={`py-2 px-1 border-b-2 transition-colors ${
                                activeTab === "discussion"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-transparent hover:text-gray-300"
                            }`}
                        >
                            Discussions
                        </button>
                        <button
                            onClick={() => changeTab("analytics", "/analytics")}
                            className={`py-2 px-1 border-b-2 transition-colors ${
                                activeTab === "analytics"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-transparent hover:text-gray-300"
                            }`}
                        >
                            Analytics Dashboard
                        </button>
                        {
                            user.role === "ADMIN" && (
                                <button
                                    onClick={() => changeTab("analytics", "/forumAnalytics")}
                                    className={`py-2 px-1 border-b-2 transition-colors ${
                                        activeTab === "forumAnalytics"
                                            ? "border-blue-500 text-blue-400"
                                            : "border-transparent hover:text-gray-300"
                                    }`}
                                >
                                    Forum Analytics
                                </button>

                            )
                        }

                        <button
                            onClick={() => changeTab("toplists", "/top")}
                            className={`py-2 px-1 border-b-2 transition-colors ${
                                activeTab === "top"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-transparent hover:text-gray-300"
                            }`}
                        >
                            Top-10 Lists
                        </button>
                        <button
                            onClick={() => changeTab("network", "/network")}
                            className={`py-2 px-1 border-b-2 transition-colors ${
                                activeTab === "network"
                                    ? "border-blue-500 text-blue-400"
                                    : "border-transparent hover:text-gray-300"
                            }`}
                        >
                            Network Explorer
                        </button>
                    </nav>

                    {/* User Profile */}
                    {/* User Profile with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-3 focus:outline-none"
                        >
              <span className="text-sm hidden md:block">
                Welcome back, <strong>{user.username}</strong>
              </span>
                            <img
                                src="https://picsum.photos/id/1005/200/200 "
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 animate-fade-in">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <a
                                        href="/changePassword"
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                        role="menuitem"
                                    >
                                        Reset Password
                                    </a>
                                    <a
                                        onClick={logout}
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                        role="menuitem"
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderNav;