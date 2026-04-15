import { FileText, Download, Calendar, User, Trash2 } from "lucide-react";
import { Note } from "../types";
import { useNotes } from "../context/NotesContext";
import { useNotifications } from "../context/NotificationContext";
import { toast } from "sonner";

interface NoteCardProps {
  note: Note;
  showDelete: boolean;
}

export function NoteCard({ note, showDelete }: NoteCardProps) {
  const { deleteNote } = useNotes();
  const { addNotification } = useNotifications();

  const handleDownload = () => {
    if (note.fileData) {
      // Create a link and trigger download
      const link = document.createElement("a");
      link.href = note.fileData;
      link.download = note.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started!");
      addNotification(
        `Downloaded "${note.title}" (${note.subject}) successfully.`,
        "info"
      );
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
      toast.success("Note deleted successfully!");
      addNotification(
        `Note "${note.title}" has been deleted from your uploads.`,
        "warning"
      );
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {note.description}
          </p>
        </div>
        <FileText className="w-10 h-10 text-blue-600 flex-shrink-0 ml-2" />
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
            {note.branch}
          </span>
          <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
            {note.semester}
          </span>
        </div>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Subject:</span> {note.subject}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {note.uploaderName}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(note.uploadDate)}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          {note.fileName} ({formatFileSize(note.fileSize)})
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        {showDelete && (
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}