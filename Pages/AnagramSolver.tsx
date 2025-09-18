import React, { useState } from "react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Card } from "../Components/ui/card";
import { Shuffle, Search, Loader2, Lightbulb } from "lucide-react";
import WordList from "../Components/WordList";
import { solveAnagram } from "../integrations/Core";

export default function AnagramSolver() {
  const [letters, setLetters] = useState("");
  const [words, setWords] = useState<{ word: string; length: number; definition: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSolve = async () => {
    if (!letters.trim()) return;

    setIsLoading(true);
    try {
      const result = await solveAnagram(letters.trim());
      setWords(result);
      setHasSearched(true);
    } catch (error) {
      console.error("Error solving anagram:", error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSolve();
    }
  };

  const clearSearch = () => {
    setLetters("");
    setWords([]);
    setHasSearched(false);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-blue-500/10 text-[var(--accent-blue)] rounded-xl flex items-center justify-center">
              <Shuffle className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Anagram Solver
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Enter your scrambled letters and discover all possible words.
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-[var(--content-bg)] border border-[var(--border-color)] p-6 md:p-8 mb-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Your Letters
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={letters}
                  onChange={(e) =>
                    setLetters(e.target.value.replace(/[^a-zA-Z]/g, ""))
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., LISTEN"
                  className="bg-[var(--primary-bg)] border-[var(--border-color)] text-[var(--text-primary)] text-lg px-4 py-3 pl-10 rounded-lg focus:border-[var(--accent-green)] focus:ring-1 focus:ring-[var(--accent-green)]"
                  disabled={isLoading}
                />
                <Lightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleSolve}
                disabled={letters.length < 2 || isLoading}
                className="w-full sm:w-auto flex-1 bg-[var(--accent-green)] text-[var(--primary-bg)] px-6 py-3 rounded-lg font-semibold transition-opacity duration-300 disabled:opacity-50 hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Solving...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Solve
                  </>
                )}
              </Button>

              {hasSearched && (
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--primary-bg)] px-6 py-3 rounded-lg"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Results */}
        {(words.length > 0 || (hasSearched && !isLoading)) && (
          <WordList
            words={words}
            title={`Results for "${letters.toUpperCase()}"`}
            emptyMessage={
              hasSearched && words.length === 0
                ? "No words found. Try different letters."
                : ""
            }
          />
        )}
      </div>
    </div>
  );
}
