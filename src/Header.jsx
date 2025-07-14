import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderNav = ({ tab }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab);

  // Update activeTab when tab prop changes
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

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
                      activeTab === "discussion"  // ✅ Fixed to match what's passed
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
            <div className="flex items-center space-x-3">
            <span className="text-sm hidden md:block">
              Welcome back, <strong>Jane Doe</strong>
            </span>
              <img
                  src="https://picsum.photos/id/1005/200/200"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
            </div>
          </div>
        </div>
      </header>
  );
};

export default HeaderNav;