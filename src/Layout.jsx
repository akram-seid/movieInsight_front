import {Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <main className="max-w-7xl mx-auto  px-4">
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;