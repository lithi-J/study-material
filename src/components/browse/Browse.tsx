"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, Info } from "lucide-react";
import { useNotes } from "@/context/NotesContext";
import { BRANCHES, SEMESTERS } from "@/types";
import { NoteCard } from "@/components/NoteCard";
import { BackButton } from "@/components/BackButton";

export default function Browse() {
  const { notes } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBranch = !selectedBranch || note.branch === selectedBranch;
      const matchesSemester =
        !selectedSemester || note.semester === selectedSemester;

      return matchesSearch && matchesBranch && matchesSemester;
    });
  }, [notes, searchTerm, selectedBranch, selectedSemester]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBranch("");
    setSelectedSemester("");
  };

  const hasActiveFilters = searchTerm || selectedBranch || selectedSemester;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <BackButton />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">Browse Materials</h1>
          <p className="text-muted-foreground">
            Search and filter study materials by branch, semester, and subject
          </p>
        </div>
        <div className="text-sm font-semibold text-muted-foreground bg-muted-surface px-4 py-2 rounded-xl border border-border">
          Found <span className="text-primary">{filteredNotes.length}</span> {filteredNotes.length === 1 ? "note" : "notes"}
        </div>
      </div>

      {/* Sample PDFs Info Banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-4xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <Info className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-xl font-bold text-foreground">Project Study Materials Ready</h3>
            <p className="text-muted-foreground leading-relaxed">
              Explore 10 curated sample PDFs covering core engineering subjects like <strong>Data Structures</strong>, <strong>Operating Systems</strong>, and <strong>Web Technologies</strong>.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Data Structures", "Java", "DBMS", "OS", "Networks", "Electronics", "Math"
              ].map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted-surface text-primary text-[10px] font-bold uppercase rounded-full border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-card rounded-4xl border border-border p-6 md:p-10 shadow-inner">
        <div className="flex flex-col gap-8">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by title, subject, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-background border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden w-full flex items-center justify-center gap-2 py-4 bg-muted-surface text-muted-foreground rounded-xl border border-border"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            {/* Filters */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ${
                showFilters ? "block" : "hidden md:grid"
              }`}
            >
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-6 py-4 bg-background border border-border rounded-xl text-foreground focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">All Branches</option>
                {BRANCHES.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>

              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-6 py-4 bg-background border border-border rounded-xl text-foreground focus:outline-hidden focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">All Semesters</option>
                {SEMESTERS.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-4 text-sm font-bold text-muted-foreground hover:text-foreground bg-muted-surface hover:bg-muted/50 border border-border rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} showDelete={false} />
          ))}
        </div>
      ) : (
        <div className="bg-muted-surface rounded-[3rem] border border-border p-20 text-center shadow-inner">
          <div className="w-24 h-24 bg-muted-surface rounded-3xl flex items-center justify-center mx-auto mb-8 border border-border">
            <Search className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            No notes found
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            {hasActiveFilters
              ? "We couldn't find any materials matching your current filters. Try relaxing your search criteria."
              : "The material vault is currently empty. Be the first to upload something!"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-all border border-primary/20"
            >
              Reset Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
