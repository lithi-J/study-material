"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload as UploadIcon, FileText, X } from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { useNotifications } from "@/context/NotificationContext";
import { BRANCHES, SEMESTERS, Note } from "@/types";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton";

export default function Upload() {
  const router = useRouter();
  const { addNote } = useNotes();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    branch: "",
    semester: "",
    subject: "",
    uploaderName: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("File size should be less than 10MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create FormData for the backend API
      const data = new FormData();
      data.append("title", formData.title);
      data.append("subject", formData.subject);
      data.append("description", formData.description);
      data.append("branch", formData.branch);
      data.append("semester", formData.semester);
      data.append("file", file);

      const result = await addNote(data);

      if (result.success) {
        toast.success("Note uploaded successfully!");
        addNotification(
          `Your note "${formData.title}" has been uploaded successfully for ${formData.branch} - ${formData.semester}.`,
          "success"
        );
        router.push("/my-uploads");
      } else {
        toast.error(result.error || "Failed to upload note");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload note. Please try again.");
      addNotification("Failed to upload note. Please try again.", "error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <BackButton />
      <div className="bg-card/80 backdrop-blur-xl rounded-[2.5rem] border border-border p-8 md:p-12 shadow-2xl">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
            <UploadIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Upload Notes</h1>
            <p className="text-muted-foreground">Share your study materials with the community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Data Structures Complete Notes"
              className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Provide a brief summary of the contents..."
              rows={4}
              className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none"
            />
          </div>

          {/* Branch and Semester */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Branch
              </label>
              <select
                required
                value={formData.branch}
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">Select Branch</option>
                {BRANCHES.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Semester
              </label>
              <select
                required
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">Select Semester</option>
                {SEMESTERS.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="e.g., Algorithms"
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>

            {/* Uploader Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Uploader Name
              </label>
              <input
                type="text"
                required
                value={formData.uploaderName}
                onChange={(e) =>
                  setFormData({ ...formData, uploaderName: e.target.value })
                }
                placeholder="e.g., John Doe"
                className="w-full px-6 py-4 bg-background border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Study Material
            </label>
            {!file ? (
              <label className="block w-full border-2 border-dashed border-border rounded-4xl p-12 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer text-center group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.xls,.xlsx,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-muted-surface rounded-3xl flex items-center justify-center mx-auto border border-border group-hover:scale-110 transition-transform">
                    <FileText className="w-10 h-10 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground mb-1">
                      Drop your file here
                    </p>
                    <p className="text-sm text-muted-foreground">Maximum file size: 10MB</p>
                  </div>
                </div>
              </label>
            ) : (
              <div className="flex items-center justify-between p-6 bg-primary/10 border border-primary/20 rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-primary font-medium tracking-wide">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • READY TO UPLOAD
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-destructive/10 text-destructive rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary/90 transition-all disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_40px_rgba(79,70,229,0.5)] active:scale-98"
            >
              <UploadIcon className={`w-6 h-6 ${isSubmitting ? 'animate-bounce' : ''}`} />
              {isSubmitting ? "UPLOADING CONTENT..." : "PUBLISH NOTES"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
