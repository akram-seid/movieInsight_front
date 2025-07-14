import { useState, useEffect } from "react";
import Network from "./Network.jsx";
import TopList from "./TopList.jsx";
import Analytics from "./Analytics.jsx";
import MovieCatalog from "./MovieCatalog.jsx";
import Discussion from "./Discussion.jsx";
import HeaderNav from "../Header.jsx";

const Home = () => {
  const [activeTab, setActiveTab] = useState("catalog");

  return (
    <div className="h-screen w-screen bg-gray-900 text-white overflow-auto">
      {/* Header with Tabs and User Profile */}
      <HeaderNav />

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Movie Catalog Tab */}
        {activeTab === "catalog" && <MovieCatalog />}

        {/* Discussions Tab */}
        {activeTab === "discussions" && <Discussion />}

        {/* Analytics Dashboard Tab */}
        {activeTab === "analytics" && <Analytics />}

        {/* Top-N Lists Tab */}
        {activeTab === "toplists" && <TopList />}

        {/* Network Explorer Tab */}
        {activeTab === "network" && <Network />}
      </main>
    </div>
  );
};

export default Home;
