import { FileText, Upload } from "lucide-react";
import { Link } from "react-router";
import { useNotes } from "../context/NotesContext";
import { NoteCard } from "./NoteCard";
import { BackButton } from "./BackButton";

export function MyUploads() {
  const { notes } = useNotes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Uploads</h1>
        <p className="text-gray-600">
          Manage all your uploaded study materials
        </p>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} showDelete={true} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No uploads yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start sharing your study materials with fellow students
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload Your First Note
          </Link>
        </div>
      )}
    </div>
  );
}