"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  Upload,
  Filter,
  Download,
  Cloud,
  ChevronRight,
  Sun,
  Moon,
  Cpu,
  Radio,
  Settings,
  Building2,
  Zap,
  FlaskConical,
  Monitor,
  Atom,
  Star,
  ArrowRight,
  Users,
  FileText,
  GitBranch,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Review {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Upload,
    title: "Upload PDFs Easily",
    description:
      "Drag & drop your notes and study materials in PDF format with just a few clicks.",
  },
  {
    icon: Filter,
    title: "Branch & Semester Filters",
    description:
      "Find exactly what you need with powerful filtering by branch, semester, and subject.",
  },
  {
    icon: Download,
    title: "Fast Downloads",
    description:
      "Lightning-fast download speeds so you can get your study materials instantly.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage Integration",
    description:
      "All files are securely stored in the cloud, accessible anytime, anywhere.",
  },
];

const branches = [
  { icon: Cpu, label: "CSE" },
  { icon: Radio, label: "ECE" },
  { icon: Settings, label: "MECH" },
  { icon: Building2, label: "CIVIL" },
  { icon: Zap, label: "EEE" },
  { icon: FlaskConical, label: "CHEM" },
  { icon: Monitor, label: "IT" },
  { icon: Atom, label: "PHYSICS" },
];

const semesters = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

const steps = [
  {
    icon: Upload,
    title: "Upload Notes",
    description:
      "Upload your PDFs and study materials through our simple Multer-based backend.",
  },
  {
    icon: Cloud,
    title: "Store in Cloud",
    description:
      "Files are automatically stored in secure cloud storage for reliable access.",
  },
  {
    icon: Download,
    title: "Browse & Download",
    description:
      "Students can browse, filter, and download materials anytime they need.",
  },
];

const reviews: Review[] = [
  {
    name: "Priya Sharma",
    role: "CSE – 3rd Year",
    avatar: "P",
    rating: 5,
    text: "Study Hub saved my semester! I found all the notes I needed in minutes. The branch filter is a game-changer.",
  },
  {
    name: "Arjun Mehta",
    role: "ECE – 2nd Year",
    avatar: "A",
    rating: 5,
    text: "Uploading my notes was super smooth and my classmates found them immediately. Love the clean dark UI!",
  },
  {
    name: "Sneha Patel",
    role: "MECH – 4th Year",
    avatar: "S",
    rating: 4,
    text: "Finally a platform built for engineering students. The semester-wise filter helps me stay organized.",
  },
];

const techStack = [
  { letter: "R", label: "React", desc: "Modern UI library for building interactive interfaces", color: "#61DAFB" },
  { letter: "N", label: "Node.js", desc: "Server-side JavaScript runtime for backend APIs", color: "#68A063" },
  { letter: "M", label: "Multer", desc: "Middleware for handling file uploads seamlessly", color: "#F7B731" },
  { letter: "C", label: "Cloud Storage", desc: "Scalable and secure file storage solution", color: "#818CF8" },
];

export default function Landing() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeBranch, setActiveBranch] = useState("CSE");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dark = mounted ? resolvedTheme === "dark" : true;

  const theme = {
    bg: dark ? "#0a0f1e" : "#f0f4ff",
    surface: dark ? "#111827" : "#ffffff",
    surface2: dark ? "#1a2235" : "#f8faff",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    text: dark ? "#e2e8f0" : "#1e293b",
    muted: dark ? "#64748b" : "#64748b",
    accent: "#6366f1",
    accentHover: "#4f46e5",
    accentGlow: dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.15)",
    cardBg: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
    headerBg: dark
      ? scrolled ? "rgba(10,15,30,0.95)" : "transparent"
      : scrolled ? "rgba(255,255,255,0.95)" : "transparent",
  };

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "all 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-link { color: ${theme.muted}; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: ${theme.text}; }

        .hero-gradient-text {
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 40%, #38bdf8 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glow-btn {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff; border: none; border-radius: 10px;
          padding: 13px 28px; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          box-shadow: 0 0 20px rgba(99,102,241,0.35);
          display: flex; align-items: center; gap: 8px;
        }
        .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(99,102,241,0.55); background: linear-gradient(135deg, #818cf8, #6366f1); }

        .outline-btn {
          background: transparent; color: ${theme.text};
          border: 1.5px solid ${theme.border}; border-radius: 10px;
          padding: 12px 26px; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .outline-btn:hover { border-color: #6366f1; color: #818cf8; background: rgba(99,102,241,0.06); }

        .feature-card {
          background: ${theme.cardBg};
          border: 1px solid ${theme.border};
          border-radius: 16px; padding: 28px;
          transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .feature-card:hover { transform: translateY(-5px); border-color: rgba(99,102,241,0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

        .icon-box {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; box-shadow: 0 8px 20px rgba(99,102,241,0.35);
        }

        .branch-pill {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 18px 16px; border-radius: 14px; cursor: pointer;
          transition: all 0.2s; min-width: 80px;
          border: 1.5px solid ${theme.border};
          background: ${theme.cardBg};
        }
        .branch-pill:hover, .branch-pill.active {
          background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.5);
        }
        .branch-pill.active { background: rgba(99,102,241,0.18); border-color: #6366f1; }

        .review-card {
          background: ${theme.cardBg}; border: 1px solid ${theme.border};
          border-radius: 16px; padding: 28px; transition: all 0.3s;
          backdrop-filter: blur(8px);
        }
        .review-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-3px); }

        .stat-box { text-align: center; }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.3)} 50%{box-shadow:0 0 40px rgba(99,102,241,0.6)} }

        .floating { animation: float 4s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

        .section-label {
          font-size: 12px; font-weight: 700; letter-spacing: 2px;
          color: #6366f1; text-transform: uppercase; margin-bottom: 12px;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 42px); font-weight: 800;
          line-height: 1.15; margin-bottom: 16px;
        }
        .section-sub {
          font-size: 16px; color: ${theme.muted}; max-width: 520px; margin: 0 auto;
          line-height: 1.7;
        }

        .step-line {
          position: absolute; top: 26px; left: 50%; right: -50%;
          height: 1px; background: linear-gradient(90deg, #6366f1, transparent);
        }

        .tech-card {
          background: ${theme.cardBg}; border: 1px solid ${theme.border};
          border-radius: 16px; padding: 36px 24px; text-align: center;
          transition: all 0.3s; backdrop-filter: blur(8px);
        }
        .tech-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-4px); }

        .footer-link { color: ${theme.muted}; text-decoration: none; font-size: 13px; transition: color 0.2s; }
        .footer-link:hover { color: ${theme.text}; }

        section { scroll-margin-top: 80px; }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hero-grid, .about-grid { grid-template-columns: 1fr !important; text-align: center; gap: 40px !important; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .hero-buttons, .hero-stats { justify-content: center; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .step-line { display: none !important; }
          .footer-content { flex-direction: column !important; text-align: center; gap: 20px !important; justify-content: center; }
        }
        @media (max-width: 600px) {
          .about-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <header
        id="landing-header"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          background: theme.headerBg,
          borderBottom: scrolled ? `1px solid ${theme.border}` : "none",
          transition: "all 0.3s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={20} color="#fff" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: theme.text }}>Study Hub</span>
          </div>

          {/* Nav Links */}
          <nav className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Features", "Categories", "How It Works", "Reviews", "About Us"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="nav-link">{item}</a>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeToggle />

            <Link href="/login" id="header-login-btn">
              <button className="glow-btn" style={{ padding: "9px 22px", fontSize: 14 }}>
                Login
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 24px 60px", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div className="hero-content">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 50, padding: "6px 14px", marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 13, color: "#818cf8", fontWeight: 500 }}>Free for all students</span>
            </div>

            <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
              Access & Share<br />
              <span className="hero-gradient-text">Engineering Notes</span><br />
              Easily
            </h1>

            <p style={{ fontSize: 17, color: theme.muted, lineHeight: 1.75, marginBottom: 36, maxWidth: 440 }}>
              Upload, explore, and download semester-wise study materials in one place. Your one-stop portal for engineering excellence.
            </p>

            <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <button className="glow-btn" id="hero-browse-btn" style={{ cursor: "default" }}>
                Browse Notes <ChevronRight size={16} />
              </button>
              <button className="outline-btn" id="hero-upload-btn" style={{ cursor: "default" }}>
                <Upload size={15} /> Upload Notes
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats" style={{ display: "flex", gap: 36 }}>
              {[
                { value: "10K+", label: "Notes Shared" },
                { value: "5K+", label: "Students" },
                { value: "50+", label: "Branches" },
              ].map((s) => (
                <div key={s.label} className="stat-box">
                  <div style={{ fontSize: 24, fontWeight: 800, color: theme.text }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Illustration */}
          <div className="floating hero-illustration" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div className="pulse-glow" style={{ width: "100%", maxWidth: 420, aspectRatio: "42/32", borderRadius: 24, background: dark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)", border: `1px solid rgba(99,102,241,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              {/* Simple illustration of students studying */}
              <svg viewBox="0 0 400 300" style={{ width: "90%", height: "90%" }} xmlns="http://www.w3.org/2000/svg">
                {/* Table */}
                <rect x="60" y="175" width="280" height="10" rx="5" fill="#6366f1" opacity="0.6" />
                <rect x="80" y="185" width="8" height="50" rx="4" fill="#4f46e5" opacity="0.5" />
                <rect x="312" y="185" width="8" height="50" rx="4" fill="#4f46e5" opacity="0.5" />

                {/* Monitor */}
                <rect x="155" y="105" width="90" height="65" rx="6" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
                <rect x="162" y="112" width="76" height="50" rx="3" fill="#0f172a" />
                {/* Screen content lines */}
                <rect x="168" y="120" width="40" height="3" rx="2" fill="#6366f1" opacity="0.7" />
                <rect x="168" y="128" width="55" height="2" rx="1" fill="#64748b" opacity="0.6" />
                <rect x="168" y="134" width="48" height="2" rx="1" fill="#64748b" opacity="0.5" />
                <rect x="168" y="140" width="35" height="2" rx="1" fill="#64748b" opacity="0.4" />
                <rect x="168" y="148" width="60" height="3" rx="2" fill="#38bdf8" opacity="0.6" />
                {/* Monitor stand */}
                <rect x="193" y="170" width="14" height="8" rx="2" fill="#4f46e5" opacity="0.6" />
                <rect x="183" y="176" width="34" height="4" rx="2" fill="#6366f1" opacity="0.5" />

                {/* Person 1 – left */}
                <circle cx="100" cy="130" r="18" fill="#4f46e5" opacity="0.8" />
                <rect x="86" y="148" width="28" height="30" rx="6" fill="#6366f1" opacity="0.7" />
                <ellipse cx="100" cy="130" rx="10" ry="12" fill="#fbbf24" opacity="0.9" />
                {/* Hair */}
                <ellipse cx="100" cy="119" rx="10" ry="6" fill="#1e1b4b" opacity="0.9" />

                {/* Person 2 – center left */}
                <circle cx="148" cy="125" r="18" fill="#4f46e5" opacity="0.8" />
                <rect x="134" y="143" width="28" height="30" rx="6" fill="#6366f1" opacity="0.7" />
                <ellipse cx="148" cy="125" rx="10" ry="12" fill="#f97316" opacity="0.9" />
                <ellipse cx="148" cy="114" rx="10" ry="6" fill="#1e1b4b" opacity="0.9" />

                {/* Person 3 – center right */}
                <circle cx="252" cy="125" r="18" fill="#4f46e5" opacity="0.8" />
                <rect x="238" y="143" width="28" height="30" rx="6" fill="#6366f1" opacity="0.7" />
                <ellipse cx="252" cy="125" rx="10" ry="12" fill="#fbbf24" opacity="0.9" />
                <ellipse cx="252" cy="114" rx="10" ry="6" fill="#1e1b4b" opacity="0.9" />

                {/* Person 4 – right */}
                <circle cx="300" cy="130" r="18" fill="#4f46e5" opacity="0.8" />
                <rect x="286" y="148" width="28" height="30" rx="6" fill="#6366f1" opacity="0.7" />
                <ellipse cx="300" cy="130" rx="10" ry="12" fill="#f97316" opacity="0.9" />
                <ellipse cx="300" cy="119" rx="10" ry="6" fill="#1e1b4b" opacity="0.9" />

                {/* Floating icons */}
                <rect x="310" y="60" width="52" height="36" rx="8" fill="#6366f1" opacity="0.2" stroke="#6366f1" strokeWidth="1" />
                <text x="325" y="83" fill="#818cf8" fontSize="13" fontWeight="bold">PDF</text>

                <rect x="38" y="60" width="52" height="36" rx="8" fill="#38bdf8" opacity="0.15" stroke="#38bdf8" strokeWidth="1" />
                <text x="51" y="83" fill="#7dd3fc" fontSize="12" fontWeight="bold">↑</text>

                {/* Dots decoration */}
                {[0,1,2,3].map(i => (
                  <circle key={i} cx={330 + i * 14} cy={230} r="3" fill="#6366f1" opacity={0.3 + i * 0.15} />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">FEATURES</div>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-sub">Powerful tools designed to make sharing and accessing study materials effortless.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="feature-card">
                  <div className="icon-box">
                    <Icon size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: theme.text }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65 }}>{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <section id="categories" style={{ padding: "100px 24px", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">CATEGORIES</div>
            <h2 className="section-title">Browse by Branch</h2>
            <p className="section-sub">Select your engineering branch and semester to find relevant study materials.</p>
          </div>

          {/* Branch pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: 44 }}>
            {branches.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.label}
                  className={`branch-pill ${activeBranch === b.label ? "active" : ""}`}
                  onClick={() => setActiveBranch(b.label)}
                  id={`branch-${b.label.toLowerCase()}`}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color="#818cf8" />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>{b.label}</span>
                </div>
              );
            })}
          </div>

          {/* Semesters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {semesters.map((sem) => (
              <Link key={sem} href="/login" id={`sem-${sem.replace(" ", "").toLowerCase()}`}>
                <button style={{ background: "rgba(99,102,241,0.08)", border: `1px solid rgba(99,102,241,0.2)`, color: "#818cf8", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.2)"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.08)"; }}
                >
                  {sem}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div className="section-label">PROCESS</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Three simple steps to share and access study materials.</p>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, position: "relative" }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} style={{ textAlign: "center", position: "relative" }}>
                  {i < steps.length - 1 && (
                    <div style={{ position: "absolute", top: 34, left: "60%", right: "-40%", height: 1, background: `linear-gradient(90deg, #6366f1, transparent)` }} />
                  )}
                  <div style={{ width: 68, height: 68, borderRadius: 18, background: "linear-gradient(135deg, #6366f1, #4338ca)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 12px 28px rgba(99,102,241,0.4)" }}>
                    <Icon size={28} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: theme.text }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65, maxWidth: 260, margin: "0 auto" }}>{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────── */}
      <section id="reviews" style={{ padding: "100px 24px", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">TESTIMONIALS</div>
            <h2 className="section-title">What Students Say</h2>
            <p className="section-sub">Thousands of students rely on Study Hub every day.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {reviews.map((r) => (
              <div key={r.name} className="review-card">
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.75, marginBottom: 20 }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: theme.text }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: theme.muted }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Us Section ────────────────────────────────────────── */}
      <section id="about-us" style={{ padding: "100px 24px", background: dark ? "rgba(99,102,241,0.03)" : "rgba(99,102,241,0.05)" }}>
        <div className="about-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div className="hero-content">
            <div className="section-label">OUR STORY</div>
            <h2 className="section-title">Built for Engineering Excellence</h2>
            <p className="content-p" style={{ fontSize: 16, color: theme.muted, lineHeight: 1.8, marginBottom: 20 }}>
              Study Hub started as a simple idea: why should finding quality engineering notes be so difficult? We built this platform to centralize the wealth of knowledge shared by students across different branches and semesters.
            </p>
            <p className="content-p" style={{ fontSize: 16, color: theme.muted, lineHeight: 1.8, marginBottom: 30 }}>
              By combining a robust Node.js backend with an intuitive React frontend, we've created a seamless experience for uploading and downloading PDF materials, powered by secure cloud storage and efficient file handling with Multer.
            </p>
            <Link href="/about">
              <button className="outline-btn" style={{ padding: "10px 24px" }}>
                Learn More About Us <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          <div className="about-features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: theme.surface, padding: 24, borderRadius: 20, border: `1px solid ${theme.border}` }}>
              <div style={{ color: "#818cf8", marginBottom: 12 }}><Users size={24} /></div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Peer to Peer</div>
              <div style={{ fontSize: 13, color: theme.muted }}>Directly share materials with your classmates.</div>
            </div>
            <div style={{ background: theme.surface, padding: 24, borderRadius: 20, border: `1px solid ${theme.border}`, marginTop: 24 }}>
              <div style={{ color: "#818cf8", marginBottom: 12 }}><FileText size={24} /></div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>PDF Only</div>
              <div style={{ fontSize: 13, color: theme.muted }}>Strictly PDF format for consistent readability.</div>
            </div>
            <div style={{ background: theme.surface, padding: 24, borderRadius: 20, border: `1px solid ${theme.border}` }}>
              <div style={{ color: "#818cf8", marginBottom: 12 }}><Cloud size={24} /></div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Cloud Sync</div>
              <div style={{ fontSize: 13, color: theme.muted }}>Your files are backed up and accessible 24/7.</div>
            </div>
            <div style={{ background: theme.surface, padding: 24, borderRadius: 20, border: `1px solid ${theme.border}`, marginTop: 24 }}>
              <div style={{ color: "#818cf8", marginBottom: 12 }}><Zap size={24} /></div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Fast Search</div>
              <div style={{ fontSize: 13, color: theme.muted }}>Filtered by branch and semester for speed.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────────────── */}
      <section id="technology" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">TECHNOLOGY</div>
            <h2 className="section-title">Built With Modern Stack</h2>
            <p className="section-sub">Powered by industry-standard technologies for reliability and performance.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {techStack.map((t) => (
              <div key={t.label} className="tech-card">
                <div style={{ fontSize: 42, fontWeight: 900, color: t.color, marginBottom: 12 }}>{t.letter}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{t.label}</div>
                <div style={{ fontSize: 13, color: theme.muted, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(56,189,248,0.08))", border: `1px solid rgba(99,102,241,0.25)`, borderRadius: 24, padding: "60px 40px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><Users size={20} color="#818cf8" /></div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><FileText size={20} color="#818cf8" /></div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><GitBranch size={20} color="#818cf8" /></div>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, marginBottom: 14 }}>
            Ready to Ace Your Exams?
          </h2>
          <p style={{ fontSize: 16, color: theme.muted, marginBottom: 32, lineHeight: 1.7 }}>
            Join thousands of engineering students who already use Study Hub to find and share study materials.
          </p>
          <Link href="/register" id="cta-login-btn">
            <button className="glow-btn" style={{ margin: "0 auto", fontSize: 16, padding: "14px 34px" }}>
              Get Started – It's Free <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${theme.border}`, padding: "40px 24px" }}>
        <div className="footer-content" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={16} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, color: theme.text }}>Study Hub</span>
          </div>

          <p style={{ fontSize: 13, color: theme.muted }}>© 2025 Study Hub. Free for all engineering students.</p>

          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Support"].map((l) => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
