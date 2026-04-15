import { Outlet, Link, useLocation } from "react-router";
import { BookOpen, Upload, Search, FileText } from "lucide-react";
import { NotificationBell } from "./NotificationBell";

export function Layout() {
  const location = useLocation();

  const navLinks = [
    { to: "/home", label: "Home", icon: BookOpen },
    { to: "/browse", label: "Browse", icon: Search },
    { to: "/upload", label: "Upload", icon: Upload },
    { to: "/my-uploads", label: "My Uploads", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">
                StudyHub
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Notification Bell */}
              <NotificationBell />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex gap-1 pb-3 overflow-x-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            StudyHub - Share knowledge, grow together
          </p>
        </div>
      </footer>
    </div>
  );
}