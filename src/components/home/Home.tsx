"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Upload, Search, FileText, BookOpen, Award, TrendingUp, ChevronRight, Info
} from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const { notes } = useNotes();
  const { user } = useAuth();
  const [selectedStat, setSelectedStat] = useState<any>(null);

  const uniqueBranches = Array.from(new Set(notes.map((note: any) => note.branch)));
  const uniqueSemesters = Array.from(new Set(notes.map((note: any) => note.semester)));

  const stats = [
    { 
      label: "Total Notes", 
      value: notes.length, 
      icon: FileText,
      description: "Collection of all available study materials across all branches.",
      details: notes.slice(0, 5).map((n: any) => n.title).join(", ") + "..."
    },
    { 
      label: "Branches", 
      value: uniqueBranches.length || 7, 
      icon: BookOpen,
      description: "Active engineering branches with available materials.",
      details: uniqueBranches.join(", ") || "CSE, ECE, MECH, CIVIL, EEE, IT, CHEM"
    },
    { 
      label: "Semesters", 
      value: uniqueSemesters.length || 8, 
      icon: Award,
      description: "Semester-wise coverage of curriculum notes.",
      details: "Full coverage from Semester 1 to Semester 8"
    },
  ];

  const features = [
    {
      icon: Upload,
      title: "Upload Notes",
      description: "Share your study materials with fellow students",
      link: "/upload",
      gradient: "from-blue-600/20 to-indigo-600/20",
      accent: "text-blue-400",
    },
    {
      icon: Search,
      title: "Browse Notes",
      description: "Find notes by branch, semester, and subject",
      link: "/browse",
      gradient: "from-emerald-600/20 to-teal-600/20",
      accent: "text-emerald-400",
    },
    {
      icon: FileText,
      title: "Quick Access",
      description: "Access quality study materials anytime",
      link: "/browse",
      gradient: "from-purple-600/20 to-pink-600/20",
      accent: "text-purple-400",
    },
  ];

  const popularTopics = [
    "Data Structures",
    "Java Programming",
    "Database",
    "Operating System",
    "Web Technologies",
    "Networks",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-pulse">
          <TrendingUp className="w-3 h-3" />
          The Ultimate Student Portal
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-foreground leading-tight tracking-tighter">
          Study Material & <br />
          <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Notes Sharing Portal
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A high-performance collaborative platform for engineering students to upload and download
          semester-wise study materials.
        </p>
        <div className="flex flex-wrap gap-6 justify-center pt-4">
          <Link
            href="/upload"
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] flex items-center gap-2 group"
          >
            <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Upload Notes
          </Link>
          <Link
            href="/browse"
            className="px-8 py-4 bg-muted-surface text-foreground border border-border rounded-2xl font-bold hover:bg-muted-surface/80 transition-all flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Browse Portal
          </Link>
        </div>
      </div>

      {/* Stats Cards - Interactive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              onClick={() => setSelectedStat(stat)}
              className="group relative bg-card border border-border rounded-3xl p-8 cursor-pointer hover:border-primary/50 transition-all hover:bg-card/80 hover:-translate-y-1 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Info className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-8 h-8 text-indigo-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-black text-foreground mt-1 tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-400 tracking-wide opacity-0 group-hover:opacity-100 transition-all">
                VIEW DETAILS <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Topics */}
      <div className="bg-muted-surface rounded-4xl p-8 border border-border shadow-inner">
        <h2 className="text-sm font-bold text-muted-foreground mb-6 uppercase tracking-[0.2em]">
          Popular Search Topics
        </h2>
        <div className="flex flex-wrap gap-3">
          {popularTopics.map((topic) => (
            <Link
              key={topic}
              href="/browse"
              className="px-6 py-3 bg-card hover:bg-primary/20 text-foreground hover:text-primary rounded-xl transition-all border border-border hover:border-primary/30 font-medium text-sm"
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* Feature Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              href={feature.link}
              className="group relative bg-card rounded-4xl p-10 border border-border hover:border-border transition-all hover:shadow-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className={`w-14 h-14 bg-muted-surface ${feature.accent} rounded-2xl flex items-center justify-center mb-8 border border-border group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stat Detail Dialog */}
      <Dialog open={!!selectedStat} onOpenChange={() => setSelectedStat(null)}>
        <DialogContent className="bg-card border-border text-foreground p-8 max-w-lg rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black mb-2 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                 {selectedStat?.icon && <selectedStat.icon className="w-6 h-6 text-primary" />}
              </div>
              {selectedStat?.label} Data
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg">
              {selectedStat?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-muted-surface rounded-3xl border border-border">
              <p className="text-sm font-bold text-muted-foreground uppercase mb-3">Currently Active</p>
              <p className="text-xs leading-relaxed text-foreground italic">
                {selectedStat?.details}
              </p>
            </div>
            <button 
              onClick={() => setSelectedStat(null)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg"
            >
              Close Details
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
