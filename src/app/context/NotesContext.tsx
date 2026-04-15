import React, { createContext, useContext, useState, useEffect } from "react";
import { Note } from "../types";
import { sampleNotes } from "../utils/sampleNotes";

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => {
    // Load notes from localStorage on mount
    const savedNotes = localStorage.getItem("studyNotes");
    if (savedNotes) {
      try {
        const parsed = JSON.parse(savedNotes);
        // If parsed is empty or not an array, use sample notes
        if (!Array.isArray(parsed) || parsed.length === 0) {
          return sampleNotes;
        }
        return parsed.map((note: any) => ({
          ...note,
          uploadDate: new Date(note.uploadDate),
        }));
      } catch {
        return sampleNotes;
      }
    }
    return sampleNotes;
  });

  // Save to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("studyNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote }}>
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