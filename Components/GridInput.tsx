import React, { useRef, useEffect } from "react";
import { cn } from "./ui/utils";

interface GridInputProps {
  grid: string[][];
  onGridChange: (value: string, row: number, col: number) => void;
}

const GridInput: React.FC<GridInputProps> = ({ grid, onGridChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: grid.length }, () =>
      Array.from({ length: grid.length }, () => null)
    )
  );

  useEffect(() => {
    // Re-initialize refs if grid size changes
    inputRefs.current = Array.from({ length: grid.length }, (_, row) =>
      Array.from({ length: grid.length }, (_, col) =>
        inputRefs.current[row]?.[col] || null
      )
    );
  }, [grid.length]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    onGridChange(value, row, col);

    if (value && inputRefs.current) {
      const size = grid.length;
      let nextRow = row;
      let nextCol = col + 1;

      if (nextCol >= size) {
        nextCol = 0;
        nextRow += 1;
      }

      if (nextRow < size) {
        inputRefs.current[nextRow][nextCol]?.focus();
      }
    }
  };

  return (
    <div
      className={cn(
        "grid gap-2 justify-center",
        `grid-cols-${grid.length}`
      )}
      style={{ gridTemplateColumns: `repeat(${grid.length}, 2.5rem)` }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            ref={(el) => {
              if (!inputRefs.current[rowIndex]) inputRefs.current[rowIndex] = [];
              inputRefs.current[rowIndex][colIndex] = el;
            }}
            value={cell}
            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
            className="w-10 h-10 text-center font-semibold text-[var(--text-primary)] bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-green)]"
            maxLength={1}
            autoCapitalize="none"
            autoCorrect="off"
          />
        ))
      )}
    </div>
  );
};

export default GridInput;
