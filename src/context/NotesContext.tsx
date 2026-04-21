"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Note } from "../types";
import { sampleNotes } from "../lib/sampleNotes";

interface NotesContextType {
  notes: Note[];
  addNote: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  deleteNote: (id: string) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Map backend material to frontend Note type
  const mapMaterialToNote = (mat: any): Note => ({
    id: mat.id,
    title: mat.title,
    description: mat.description || "",
    branch: mat.branch || "General",
    semester: mat.semester || "N/A",
    subject: mat.subject,
    fileName: mat.file_url.split("/").pop() || "document.pdf",
    fileSize: 0, // Backend doesn't store this yet
    uploadDate: new Date(mat.createdAt),
    uploaderName: mat.uploadedBy?.name || "System",
    uploaderId: mat.uploaded_by,
    fileData: mat.file_url
  });

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/materials");
      if (response.ok) {
        const data = await response.json();
        const apiNotes = data.materials.map(mapMaterialToNote);
        setNotes(apiNotes);
      }
    } catch (error) {
      console.error("Failed to fetch materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const addNote = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/materials", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newNote = mapMaterialToNote(data.material);
        setNotes((prev) => [newNote, ...prev]);
        return { success: true };
      }
      const err = await response.json();
      return { success: false, error: err.error };
    } catch (error) {
      return { success: false, error: "Network error occurred" };
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        return { success: true };
      }
      const err = await response.json();
      return { success: false, error: err.error };
    } catch (error) {
      return { success: false, error: "Network error occurred" };
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, loading }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
}