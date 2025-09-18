import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/index";
import { ArrowRight } from "lucide-react";

export default function GameCard({ game, index }) {
  const colorClasses = {
    blue: {
      accent: "text-[var(--accent-blue)]",
      bg: "bg-blue-500/10",
      border: "hover:border-[var(--accent-blue)]/50"
    },
    green: {
      accent: "text-[var(--accent-green)]",
      bg: "bg-green-500/10",
      border: "hover:border-[var(--accent-green)]/50"
    }
  };
  
  const colors = colorClasses[game.color];
  
  return (
    <Link
      to={createPageUrl(game.route)}
      className={`group block bg-[var(--content-bg)] border border-[var(--border-color)] rounded-2xl p-8 transition-all duration-300 ${colors.border} hover:-translate-y-1`}
    >
      <div className="relative">
        <div className={`w-12 h-12 ${colors.bg} ${colors.accent} rounded-xl mb-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <game.icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
          {game.title}
        </h3>
        
        <p className="text-[var(--text-secondary)] mb-6">
          {game.description}
        </p>
        
        <div className={`flex items-center gap-2 font-semibold ${colors.accent}`}>
          <span>Launch Solver</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}