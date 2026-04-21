"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Upload, Search, FileText, User, LogOut, Settings } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { href: "/home", label: "Home", icon: BookOpen },
    { href: "/browse", label: "Browse", icon: Search },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/my-uploads", label: "My Uploads", icon: FileText },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Header */}
        <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link href="/home" className="flex items-center gap-2 group transition-all">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-foreground via-foreground/80 to-primary/60 bg-clip-text text-transparent">
                  StudyHub
                </span>
              </Link>

              <div className="flex items-center gap-8">
                <nav className="hidden lg:flex gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                          isActive
                            ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(99,102,241,0.1)]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted-surface"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-hidden group">
                      <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-muted-surface transition-all cursor-pointer border border-transparent hover:border-border">
                        <Avatar className="w-10 h-10 border-2 border-border group-hover:border-primary transition-all shadow-lg shrink-0">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold uppercase text-xs">
                            {user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left hidden sm:block">
                          <p className="text-[13px] font-bold text-foreground leading-tight">{user?.name || "User"}</p>
                          <p className="text-[10px] font-medium text-primary uppercase tracking-widest leading-none mt-0.5">Admin</p>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-card border-border text-foreground p-2" align="end">
                      <DropdownMenuLabel className="font-normal px-2 py-3">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
                            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">Admin</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="focus:bg-destructive/10 text-destructive cursor-pointer py-2.5 rounded-lg flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout Session
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="lg:hidden flex gap-1 pb-4 overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap font-medium ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground"
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
        <main className="flex-1 overflow-x-hidden pt-4 pb-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-background border-t border-border py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground tracking-wide">StudyHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2026 StudyHub - Empowering Engineering Students
              </p>
              <div className="flex gap-6">
                <span className="text-xs hover:text-foreground cursor-pointer transition-colors">Privacy</span>
                <span className="text-xs hover:text-foreground cursor-pointer transition-colors">Terms</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
