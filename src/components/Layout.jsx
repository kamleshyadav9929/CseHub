import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    <Navbar />
    <main className="p-4 pt-6 max-w-6xl mx-auto">
      <Outlet />
    </main>
    <footer className="mt-10 text-sm text-gray-400 text-center py-4">
      Made with ❤️ for BIT Patna CSE Students
    </footer>
  </div>
);

export default Layout;
