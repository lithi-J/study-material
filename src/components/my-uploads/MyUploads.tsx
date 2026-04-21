"use client";

import { useNotes } from "@/context/NotesContext";
import { useAuth } from "@/context/AuthContext";
import { NoteCard } from "@/components/NoteCard";
import { BackButton } from "@/components/BackButton";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function MyUploads() {
  const { notes, deleteNote } = useNotes();
  const { user } = useAuth();
  
  // Filter only notes uploaded by the current user
  const myNotes = notes.filter(note => note.uploaderId === user?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <BackButton />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">My Uploads</h1>
          <p className="text-muted-foreground">
            Manage and track the study materials you've shared
          </p>
        </div>
        <Link
          href="/upload"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Upload New
        </Link>
      </div>

      {myNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              showDelete={true} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-muted-surface rounded-[3rem] border border-border p-20 text-center shadow-inner">
          <div className="w-24 h-24 bg-muted-surface rounded-3xl flex items-center justify-center mx-auto mb-8 border border-border">
            <FileText className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            No uploads yet
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            You haven't uploaded any study materials yet. Start sharing to help your fellow students!
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Upload Your First Note
          </Link>
        </div>
      )}
    </div>
  );
}
