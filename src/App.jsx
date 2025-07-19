// src/App.js
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from './context/AuthContext'; // Import AuthProvider
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import AuthLayout from "./AuthLayout"; // Assuming this is for login/register layout
import Layout from "./Layout"; // Your main application layout
// Import all your page components
import ForumThread from "./pages/ForumThread.jsx";
import Login from "./pages/Login.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import ForumAdmin from "./pages/ForumAdminView.jsx";
import MovieSearchPage from "./pages/MovieSearchPage.jsx";
import MovieCatalog from "./pages/MovieCatalog.jsx";
import Register from "./pages/RegisterPage.jsx";
import Discussion from "./pages/Discussion.jsx";
import Network from "./pages/Network.jsx";
import Analytics from "./pages/Analytics.jsx";
import TopList from "./pages/TopList.jsx";
import ForgotPassword from "./pages/ForgetPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ForumAnalytics from "./pages/ForumAnalytics.jsx";

function App() {
    return (
        <Router>
            <AuthProvider> {/* Wrap your entire application with AuthProvider */}
                <Routes>
                    {/* Public Routes (e.g., Login, Register) - these do NOT require authentication */}
                    <Route element={<AuthLayout/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/reset" element={<ForgotPassword/>}/>
                    </Route>

                    {/* Protected Routes - All routes nested inside this PrivateRoute will require authentication */}
                    <Route element={<PrivateRoute/>}>
                        {/* Apply your main Layout to all protected routes */}
                        <Route element={<Layout/>}>
                            <Route path="/" element={<MovieCatalog/>}/>
                            <Route path="/discussion" element={<Discussion/>}/>
                            <Route path="/forum/:id" element={<ForumThread/>}/>
                            <Route path="/forumAdmin" element={<ForumAdmin/>}/>
                            <Route path="/forumAnalytics" element={<ForumAnalytics/>}/>
                            <Route path="/detail" element={<MovieDetail/>}/>
                            <Route path="/movies/:id" element={<MovieDetail/>}/>
                            <Route path="/search" element={<MovieSearchPage/>}/>
                            <Route path="/network" element={<Network/>}/>
                            <Route path="/analytics" element={<Analytics/>}/>
                            <Route path="/changePassword" element={<ResetPassword/>}/>
                            <Route path="/top" element={<TopList/>}/>
                        </Route>
                    </Route>

                    {/* Optional: Catch-all for undefined routes */}
                    <Route path="*" element={
                        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-3xl">
                            404 - Page Not Found
                        </div>
                    }/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;