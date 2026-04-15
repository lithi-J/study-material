import { Link } from "react-router";
import { Upload, Search, FileText, Users, BookOpen, Award, LogOut, TrendingUp, RefreshCw } from "lucide-react";
import { useNotes } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function Home() {
  const { notes } = useNotes();
  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    addNotification(
      `Goodbye ${user?.name}! You have been logged out successfully.`,
      "info"
    );
    navigate("/");
  };

  const handleResetNotes = () => {
    if (confirm("This will reset to the 10 sample PDFs. Your uploaded notes will be removed. Continue?")) {
      localStorage.removeItem("studyNotes");
      window.location.reload();
      toast.success("Notes reset to sample PDFs!");
    }
  };

  // Calculate unique branches and semesters from actual notes
  const uniqueBranches = new Set(notes.map(note => note.branch)).size;
  const uniqueSemesters = new Set(notes.map(note => note.semester)).size;

  const stats = [
    { label: "Total Notes", value: notes.length, icon: FileText },
    { label: "Branches", value: uniqueBranches || 7, icon: BookOpen },
    { label: "Semesters", value: uniqueSemesters || 8, icon: Award },
  ];

  const features = [
    {
      icon: Upload,
      title: "Upload Notes",
      description: "Share your study materials with fellow students",
      link: "/upload",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Search,
      title: "Browse Notes",
      description: "Find notes by branch, semester, and subject",
      link: "/browse",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: FileText,
      title: "Download PDFs",
      description: "Access quality study materials anytime",
      link: "/browse",
      color: "bg-purple-50 text-purple-600",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Info and Logout */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-600">
            Welcome, <span className="font-medium text-gray-900">{user?.name}</span>
          </span>
          <button
            onClick={handleResetNotes}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            title="Reset to sample PDFs"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Study Material & Notes Sharing Portal
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          A collaborative platform for engineering students to share and access
          study materials, categorized by branch and semester.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/upload"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Notes
          </Link>
          <Link
            to="/browse"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Browse Notes
          </Link>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-12 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Available Topics - Try Searching:
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {popularTopics.map((topic) => (
            <Link
              key={topic}
              to="/browse"
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-200 text-sm"
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <Icon className="w-12 h-12 text-gray-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}