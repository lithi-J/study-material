"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
import { NotesProvider } from "../context/NotesContext";
import { NotificationProvider } from "../context/NotificationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <NotificationProvider>
          <NotesProvider>
            {children}
          </NotesProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
