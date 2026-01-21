import React, { useState } from "react";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import { Shuffle, Search, Loader2, ArrowRight } from "lucide-react";
import GridInput from "../Components/GridInput";  
import WordList from "../Components/WordList";
import { solveWordHunt } from "../integrations/Core"; 

export default function WordHuntSolver() {
  const [gridSize, setGridSize] = useState(4);  
  const [grid, setGrid] = useState<string[][]>(generateEmptyGrid(gridSize));
  const [words, setWords] = useState<{ word: string; length: number; definition: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  function generateEmptyGrid(size: number) {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(""));
  }

  const handleSolve = async () => {
    setIsLoading(true);
    try {
      const result = await solveWordHunt(grid);
      setWords(result);
      setHasSearched(true);
    } catch (error) {
      console.error("Error solving Word Hunt:", error);
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    if (e.key === "Enter" && !isLoading) {
      handleSolve();
    }
  };

  const handleGridChange = (value: string, row: number, col: number) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = value.toUpperCase().replace(/[^A-Z]/g, "");  // Uppercase and sanitize input
    setGrid(updatedGrid);
  };

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    setGridSize(newSize);
    setGrid(generateEmptyGrid(newSize));
  };

  const clearSearch = () => {
    setGrid(generateEmptyGrid(gridSize));
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
            Word Hunt Solver
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Select your grid size and enter your letters. Then, solve!
          </p>
        </div>

        {/* Grid Size Select */}
        <div className="mb-6 text-center">
          <label htmlFor="gridSize" className="text-lg font-medium text-[var(--text-primary)] mr-2">Grid Size</label>
          <select
            id="gridSize"
            value={gridSize}
            onChange={handleGridSizeChange}
            className="border rounded-md p-2"
          >
            {[3, 4, 5, 6, 7, 8, 9].map((size) => (
              <option key={size} value={size}>
                {size}x{size}
              </option>
            ))}
          </select>
        </div>

        {/* Grid Input */}
        <Card className="bg-[var(--content-bg)] border border-[var(--border-color)] p-6 md:p-8 mb-8">
          <GridInput grid={grid} onGridChange={handleGridChange} />

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button
              onClick={handleSolve}
              disabled={isLoading}
              className="w-full sm:w-auto flex-1 bg-[var(--accent-green)] text-[var(--primary-bg)] px-6 py-3 rounded-lg font-semibold transition-opacity duration-300 disabled:opacity-50 hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Solving...
                </>
              ) : (
                <>
                  <ArrowRight className="w-5 h-5 mr-2" />
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
        </Card>

        {/* Results */}
        {(words.length > 0 || (hasSearched && !isLoading)) && (
          <WordList
            words={words}
            title="Found Words"
            emptyMessage={hasSearched && words.length === 0 ? "No valid words found!" : ""}
          />
        )}
      </div>
    </div>
  );
}
