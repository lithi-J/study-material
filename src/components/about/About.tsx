"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft, Users, Zap, Cloud, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  const theme = {
    bg: "#0a0f1e",
    surface: "#111827",
    text: "#e2e8f0",
    muted: "#64748b",
    accent: "#6366f1",
    border: "rgba(255,255,255,0.08)",
  };

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .container { max-width: 900px; margin: 0 auto; padding: 80px 24px; }
        .back-link { display: flex; align-items: center; gap: 8px; color: ${theme.muted}; text-decoration: none; font-size: 14px; margin-bottom: 40px; transition: color 0.2s; }
        .back-link:hover { color: ${theme.accent}; }
        .title { font-size: 48px; font-weight: 800; margin-bottom: 24px; background: linear-gradient(135deg, #818cf8, #6366f1); -webkit-background-clip: text; -webkit-fill-color: transparent; background-clip: text; color: transparent; }
        .section-title { font-size: 24px; font-weight: 700; margin: 48px 0 20px; display: flex; align-items: center; gap: 12px; }
        .content-p { font-size: 17px; line-height: 1.8; color: ${theme.muted}; margin-bottom: 20px; }
        .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; }
        .feature-item { background: rgba(255,255,255,0.03); border: 1px solid ${theme.border}; padding: 24px; border-radius: 16px; transition: transform 0.2s; }
        .feature-item:hover { transform: translateY(-4px); border-color: ${theme.accent}; }
        .feature-icon { color: ${theme.accent}; margin-bottom: 16px; }
        .feature-h { font-size: 16px; font-weight: 700; margin-bottom: 8px; color: ${theme.text}; }
        .feature-d { font-size: 14px; color: ${theme.muted}; line-height: 1.5; }
      `}</style>

      <div className="container">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="title">About Study Hub</h1>
        
        <p className="content-p">
          Study Hub is a specialized web platform designed specifically for engineering students to bridge the gap in study material accessibility. We believe that knowledge grows when shared, and our mission is to create a centralized repository where students can seamlessly upload, categorize, and download high-quality notes.
        </p>

        <div className="section-title">
          <Users size={24} className="feature-icon" /> Our Mission
        </div>
        <p className="content-p">
          In the fast-paced world of engineering, having the right resources at the right time can make all the difference. Study Hub empowers students by providing a collaborative environment where seniors can mentor juniors through shared academic insights, semester-wise and branch-wise.
        </p>

        <div className="section-title">
          <Zap size={24} className="feature-icon" /> Technical Excellence
        </div>
        <p className="content-p">
          Built with <strong>React</strong> and <strong>Node.js</strong>, Study Hub leverages modern backend technologies like <strong>Multer</strong> for robust file handling and cloud storage integrations to ensure your materials are always available, secure, and easy to find.
        </p>

        <div className="feature-grid">
          <div className="feature-item">
            <Cloud className="feature-icon" size={24} />
            <div className="feature-h">Cloud Storage</div>
            <div className="feature-d">Securely store and access your PDFs from anywhere in the world.</div>
          </div>
          <div className="feature-item">
            <ShieldCheck className="feature-icon" size={24} />
            <div className="feature-h">Branch Categorization</div>
            <div className="feature-d">Organized by CSE, ECE, MECH, and all major engineering branches.</div>
          </div>
          <div className="feature-item">
            <Heart className="feature-icon" size={24} />
            <div className="feature-h">Community Driven</div>
            <div className="feature-d">A platform built by students, for students, to foster academic growth.</div>
          </div>
          <div className="feature-item">
            <BookOpen className="feature-icon" size={24} />
            <div className="feature-h">Semester Wise</div>
            <div className="feature-d">Find exactly what you need for Sem 1 through Sem 8 in seconds.</div>
          </div>
        </div>

        <div style={{ marginTop: 80, textAlign: 'center', borderTop: `1px solid ${theme.border}`, paddingTop: 40 }}>
          <p style={{ color: theme.muted, fontSize: 14 }}>© 2025 Study Hub | Engineering Excellence Together</p>
        </div>
      </div>
    </div>
  );
}
