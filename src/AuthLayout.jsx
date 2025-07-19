import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <main className="container mx-auto py-0 px-4"><Outlet/></main>
        </div>
    );
};

export default AuthLayout;
