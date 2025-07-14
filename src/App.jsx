import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthLayout from "./AuthLayout";
import ForumThread from "./pages/ForumThread.jsx";
import Login from "./pages/Login.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import ForumAdmin from "./pages/ForumAdminView.jsx";
import MovieSearchPage from "./pages/MovieSearchPage.jsx";
import Layout from "./Layout";
import MovieCatalog from "./pages/MovieCatalog.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Discussion from "./pages/Discussion.jsx";
import Network from "./pages/Network.jsx";
import Analytics from "./pages/Analytics.jsx";
import TopList from "./pages/TopList.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<MovieCatalog/>}/>
                    <Route path="/discussion" element={<Discussion/>}/>
                    <Route path="/forum/:id" element={<ForumThread/>}/>
                    <Route path="/forumAdmin" element={<ForumAdmin/>}/>
                    <Route path="/detail" element={<MovieDetail/>}/>
                    <Route path="/movies/:id" element={<MovieDetail/>}/>
                    <Route path="/search" element={<MovieSearchPage/>}/>
                    <Route path="/network" element={<Network/>}/>
                    <Route path="/analytics" element={<Analytics/>}/>
                    <Route path="/top" element={<TopList/>}/>

                </Route>

                {/* Routes without navbar */}
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
