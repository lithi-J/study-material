import { FileText, Download, Calendar, User, Trash2, Eye } from "lucide-react";
import { Note } from "@/types";
import { useNotes } from "@/context/NotesContext";
import { useNotifications } from "@/context/NotificationContext";
import { toast } from "sonner";
import { useState } from "react";
import { PDFPreview } from "./PDFPreview";

interface NoteCardProps {
  note: Note;
  showDelete: boolean;
}

export function NoteCard({ note, showDelete }: NoteCardProps) {
  const { deleteNote } = useNotes();
  const { addNotification } = useNotifications();
  const [showPreview, setShowPreview] = useState(false);

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

  const formatDate = (date: any) => {
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <>
      <div className="bg-card rounded-4xl border border-border p-8 hover:border-primary/30 transition-all hover:shadow-2xl group relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {note.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-medium">
              {note.description}
            </p>
          </div>
          <div className="w-14 h-14 bg-muted-surface rounded-2xl border border-border flex items-center justify-center shrink-0 ml-4 group-hover:bg-primary group-hover:border-primary transition-all shadow-inner">
            <FileText className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/10">
              {note.branch}
            </span>
            <span className="px-3 py-1 bg-emerald-500/5 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/10">
              Semester {note.semester}
            </span>
          </div>
          
          <div className="p-5 bg-muted-surface rounded-2xl border border-border shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full -mr-8 -mt-8" />
             <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-2">Academic Subject</p>
             <p className="text-sm text-foreground font-black uppercase italic tracking-tight">{note.subject}</p>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 font-bold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted-surface rounded-xl border border-border/50">
              <User className="w-3.5 h-3.5 text-primary" />
              {note.uploaderName}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted-surface rounded-xl border border-border/50">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {formatDate(note.uploadDate)}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 font-medium px-1">
            <span className="truncate max-w-[150px]">{note.fileName}</span>
            <span className="shrink-0">• {formatFileSize(note.fileSize)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="flex-1 px-4 py-3.5 bg-muted-surface text-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted border border-border transition-all flex items-center justify-center gap-2 shadow-inner group/view"
          >
            <Eye className="w-4 h-4 text-primary group-hover/view:scale-125 transition-transform" />
            View
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-3.5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_8px_20px_rgba(79,70,229,0.3)] flex items-center justify-center gap-2 group/down"
          >
            <Download className="w-4 h-4 group-hover/down:-translate-y-0.5 transition-transform" />
            Get File
          </button>
          {showDelete && (
            <button
              onClick={handleDelete}
              className="w-12 h-14 flex items-center justify-center bg-red-500/5 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10 hover:border-red-500 group/del"
            >
              <Trash2 className="w-4 h-4 group-hover/del:rotate-12 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {showPreview && (
        <PDFPreview note={note} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
}