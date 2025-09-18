import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Home } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--primary-bg)] text-[var(--text-primary)]">
      <style>{`
        :root {
          --primary-bg: #1D203E; /* Dark Navy from icon */
          --content-bg: #2C305A; /* Lighter navy for cards */
          --accent-green: #9CDE40; /* Lime Green from icon */
          --accent-blue: #007AFF;
          --accent-red: #E63946;
          --letter-bg: #D1D5DB; /* Controller Grey */
          --letter-text: #111827;
          --text-primary: #F0F2F5;
          --text-secondary: #A0AEC0;
          --border-color: #4A5568;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: var(--primary-bg);
          color: var(--text-primary);
        }
      `}</style>
      
      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Floating Home Button */}
      {location.pathname !== createPageUrl("Home") && (
         <Link
          to={createPageUrl("Home")}
          className="fixed bottom-6 right-6 bg-[var(--content-bg)] h-14 w-14 rounded-full flex items-center justify-center border border-[var(--border-color)] shadow-lg hover:border-[var(--accent-green)] transition-all duration-300 group"
        >
          <Home className="h-6 w-6 text-[var(--text-secondary)] group-hover:text-[var(--accent-green)] transition-colors" />
        </Link>
      )}
    </div>
  );
}