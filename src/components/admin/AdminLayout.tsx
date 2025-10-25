"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { admin, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Appointments", href: "/admin/appointments" },
    { name: "Classes", href: "/admin/classes" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 transition duration-300 ease-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:inset-0 bg-brand-primary`}
        >
          {/* Logo */}
          <div className="flex items-center justify-center py-8 border-b border-brand-dark">
            <span className="text-white text-xl font-semibold">Admin Portal</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-brand-dark text-white"
                      : "text-gray-200 hover:bg-brand-dark hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Section */}
          <div className="px-4 py-6 border-t border-brand-dark">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-brand-primary text-sm font-semibold">
                    {admin?.name?.charAt(0) || "A"}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{admin?.name || "Admin"}</p>
                <p className="text-xs text-gray-300">{admin?.email || "admin@example.com"}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-200 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none focus:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Page content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">{children}</main>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black opacity-50 transition-opacity duration-300 ease-out md:hidden"
          ></div>
        )}
      </div>
    </ProtectedRoute>
  );
}
