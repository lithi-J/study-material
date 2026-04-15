import { useState, useMemo } from "react";
import { Search, Download, Filter, X, Info } from "lucide-react";
import { useNotes } from "../context/NotesContext";
import { BRANCHES, SEMESTERS } from "../types";
import { NoteCard } from "./NoteCard";
import { BackButton } from "./BackButton";

export function Browse() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Notes</h1>
        <p className="text-gray-600">
          Search and filter study materials by branch, semester, and subject
        </p>
      </div>

      {/* Sample PDFs Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">10 Sample PDFs Available</h3>
            <p className="text-sm text-blue-800 mb-2">
              Try searching for: <strong>Data Structure</strong>, <strong>Java</strong>, <strong>Database</strong>, 
              <strong> Operating System</strong>, <strong>Web Technologies</strong>, or <strong>Networks</strong>
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Data Structures & Algorithms</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">OOP with Java</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">DBMS</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Operating Systems</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Computer Networks</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Digital Electronics</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Microprocessors</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Engineering Math</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Web Technologies</span>
              <span className="px-2 py-1 bg-white text-blue-700 rounded">Software Engineering</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, subject, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Toggle (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${
            showFilters ? "block" : "hidden md:grid"
          }`}
        >
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Found {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
        </p>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} showDelete={false} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No notes found
          </h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters
              ? "Try adjusting your filters or search terms"
              : "No notes have been uploaded yet"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}