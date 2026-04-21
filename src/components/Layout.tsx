import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Upload, Search, FileText } from "lucide-react";
import { NotificationBell } from "./NotificationBell";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/home", label: "Home", icon: BookOpen },
    { href: "/browse", label: "Browse", icon: Search },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/my-uploads", label: "My Uploads", icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/home" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                StudyHub
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted-surface hover:text-foreground"
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
          <nav className="md:hidden flex gap-1 pb-3 overflow-x-auto scrollbar-hide">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted-surface"
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
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="font-bold text-foreground">StudyHub</span> - Share knowledge, grow together
          </p>
        </div>
      </footer>
    </div>
  );
}