// components/AuthLayout.jsx
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto py-0 px-4">{children}</main>
    </div>
  );
};

export default AuthLayout;
