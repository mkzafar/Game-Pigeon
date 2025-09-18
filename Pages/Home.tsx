import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shuffle, Grid3X3 } from "lucide-react";
import GameCard from "../Components/GameCard";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c64fcd82ba9b023799d257/3988a22f4_image.png";

export default function Home() {
  const games = [
    {
      title: "Anagram Solver",
      description: "Unscramble letters to find all possible words instantly.",
      icon: Shuffle,
      color: "blue",
      route: "AnagramSolver",
    },
    {
      title: "Word Hunt Solver", 
      description: "Find all hidden words in any size grid with our smart solver.",
      icon: Grid3X3,
      color: "green", 
      route: "WordHuntSolver",
    }
  ];

  return (
    <div>
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-[var(--accent-green)]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img src={LOGO_URL} alt="Game Pigeon Solver Logo" className="w-28 h-28 md:w-32 md:h-32 rounded-full" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Word Game Solver
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
              You ever wanna play a casual game of Word Hunt or Anagrams but you can't beat this one friend? Use this tool to beat them with ease!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {games.map((game, index) => (
              <GameCard 
                key={game.title}
                game={game}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}