"use client";

import { X, Download, Share2, Printer, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Note } from "@/types";
import { useEffect, useState } from "react";

interface PDFPreviewProps {
  note: Note;
  onClose: () => void;
}

export function PDFPreview({ note, onClose }: PDFPreviewProps) {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling when preview is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle loading state for mock content or actual PDF
  useEffect(() => {
    if (!note.fileData?.startsWith('data:application/pdf') && !note.fileData?.endsWith('.pdf')) {
      setLoading(false);
    }
  }, [note.fileData]);

  const handleDownload = () => {
    if (note.fileData) {
      const link = document.createElement("a");
      link.href = note.fileData;
      link.download = note.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isSampleData = note.fileData?.includes('BT') || !note.fileData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-xl transition-all"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-6xl h-full bg-card border border-border rounded-4xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header/Toolbar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border bg-muted-surface/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="text-primary font-bold text-xs uppercase">PDF</span>
            </div>
            <div>
              <h2 className="font-bold text-foreground truncate max-w-[200px] md:max-w-md">
                {note.title}
              </h2>
              <p className="text-xs text-muted-foreground font-medium">
                {note.subject} • {note.branch} • Semester {note.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 px-4 py-2 bg-muted-surface border border-border rounded-xl mr-4">
              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-2">100%</span>
              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-border mx-2" />
              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={handleDownload}
              className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group"
              title="Download PDF"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            <button 
              className="p-3 bg-muted-surface text-muted-foreground hover:text-foreground rounded-xl border border-border transition-all"
              title="Print"
              onClick={() => window.print()}
            >
              <Printer className="w-5 h-5" />
            </button>

            <button 
              onClick={onClose}
              className="p-3 bg-muted-surface text-muted-foreground hover:text-red-500 rounded-xl border border-border transition-all hover:bg-red-500/10 hover:border-red-500/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-muted/30 overflow-auto p-4 md:p-10 flex justify-center scroll-smooth">
          <div className="w-full max-w-4xl bg-white shadow-2xl min-h-screen relative rounded-lg">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            )}
            
            {!isSampleData ? (
              note.fileName.toLowerCase().endsWith('.pdf') || note.fileData?.startsWith('data:application/pdf') ? (
                <iframe 
                  src={`${note.fileData}#toolbar=0`} 
                  className="w-full h-full border-none rounded-lg"
                  onLoad={() => setLoading(false)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-20 text-center space-y-6 min-h-[600px] text-slate-800">
                  <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                    <FileText className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">Preview Not Available</h2>
                    <p className="text-slate-500 font-medium max-w-xs mx-auto">
                      This file format ({note.fileName.split('.').pop()?.toUpperCase()}) cannot be previewed directly in the browser.
                    </p>
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                    <Download className="w-5 h-5" />
                    Download to View
                  </button>
                </div>
              )
            ) : (
              /* THE "50-PAGE" HIGH-FIDELITY VIEW */
              <div className="p-8 md:p-24 space-y-24 max-w-5xl mx-auto text-slate-800">
                
                {/* --- PAGE 1: TITLE PAGE --- */}
                <section className="h-[800px] flex flex-col justify-between border-b-8 border-primary pb-20">
                  <div className="space-y-8">
                     <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                        <BookOpen className="w-10 h-10 text-white" />
                     </div>
                     <div className="space-y-4">
                        <h1 className="text-7xl font-black tracking-tighter leading-none italic uppercase">
                          {note.subject}
                        </h1>
                        <div className="h-2 w-32 bg-indigo-600 rounded-full" />
                        <p className="text-3xl font-bold text-slate-400">Advanced Study & Research Module</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Document Classification</p>
                       <p className="text-xl font-black italic">{note.title}</p>
                    </div>
                    <div className="text-right space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Curated By</p>
                       <p className="text-xl font-black uppercase">{note.uploaderName || "Unknown"}</p>
                    </div>
                  </div>
                </section>

                {/* --- PAGE 2: TABLE OF CONTENTS --- */}
                <section className="space-y-12">
                   <h2 className="text-3xl font-black uppercase italic tracking-tight border-l-8 border-primary pl-6">Detailed Contents</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
                      {[
                        "Introduction and Historical Context", "Core Principles & Definitions",
                        "System Architecture & Framework", "Practical Implementation Strategies",
                        "Comparative Analysis: Case Studies", "Performance & Optimization",
                        "Security Protocols & Risk Management", "Future Trends and AI Integration",
                        "Examination Patterns (2020-2025)", "Practice Questions & Solutions"
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-2 group cursor-pointer">
                           <span className="font-bold text-slate-600 group-hover:text-primary transition-colors">0{i+1}. {item}</span>
                           <span className="text-slate-300 font-black tracking-tighter">PAGE {i * 5 + 1}</span>
                        </div>
                      ))}
                   </div>
                </section>

                {/* --- PAGE 3: THE "MEAT" (CONTENT) --- */}
                <section className="space-y-12">
                   <div className="flex items-center gap-6">
                      <span className="text-8xl font-black text-indigo-100 italic">01</span>
                      <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                         Core Theory & <br/><span className="text-primary">Foundational Concepts</span>
                      </h2>
                   </div>
                   
                   <div className="pl-4 border-l-2 border-slate-200 space-y-8 text-lg leading-relaxed text-slate-600 font-medium">
                      <p>
                        In this module of <strong>{note.subject}</strong>, we dive deep into the mechanics of <strong>{note.title}</strong>. Unlike traditional notes, this guide focuses on the "Why" before the "How."
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="p-8 bg-slate-900 text-white rounded-4xl shadow-2xl space-y-4">
                            <Zap className="w-8 h-8 text-amber-400" />
                            <h4 className="font-black uppercase tracking-widest text-indigo-300 text-xs">The Efficiency Rule</h4>
                            <p className="text-sm leading-relaxed text-slate-300 italic">"Complexity is the enemy of execution. In {note.title}, we reduce overhead by implementing a streamlined logic flow."</p>
                         </div>
                         <div className="p-8 bg-indigo-600 text-white rounded-4xl shadow-2xl space-y-4">
                            <Target className="w-8 h-8 text-indigo-200" />
                            <h4 className="font-black uppercase tracking-widest text-indigo-100 text-xs">Exam Focal Point</h4>
                            <p className="text-sm leading-relaxed text-indigo-50 italic">Expect at least two 10-mark questions regarding the integration of {note.title} within modern architectures.</p>
                         </div>
                      </div>

                      <p>
                         Studies have shown that students who master {note.subject} in their {note.semester} have a 40% higher success rate in technical interviews. This document serves as your primary leverage.
                      </p>
                   </div>
                </section>

                {/* --- PAGE 4: VISUAL BREAK --- */}
                <section className="py-20 bg-slate-50 rounded-[3rem] text-center border border-slate-200">
                   <Lightbulb className="w-16 h-16 text-primary mx-auto mb-6" />
                   <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Did You Know?</h3>
                   <p className="max-w-2xl mx-auto text-slate-500 font-medium italic">
                      The principles discussed in this 50-page module are the same foundations used by tech giants to build scalable systems today. Mastering these {note.subject} basics is your first step to engineering leadership.
                   </p>
                </section>

                {/* --- FOOTER / PAGINATION MOCK --- */}
                <div className="flex justify-between items-center pt-20 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                   <span>StudyHub Master Series</span>
                   <span className="px-4 py-2 bg-slate-100 rounded-full text-slate-500">Page 01 of 50</span>
                   <span>Ver: 2.0.4</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Bar */}
        <div className="px-8 py-4 bg-card border-t border-border flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Secure Connection
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Education Theme Active
            </span>
          </div>
          <div>
            Powered by StudyHub • Document ID: {note.id.substring(0, 8)}
          </div>
        </div>
      </div>
    </div>
  );
}

import { 
  FileText, BookOpen, Lightbulb, CheckCircle2, 
  Target, Zap, Clock, Bookmark, HelpCircle 
} from "lucide-react";
