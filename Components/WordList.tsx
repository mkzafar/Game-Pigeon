
import React from "react";
import { Card } from "../Components/ui/card";
import { Badge } from "../Components/ui/badge";
import { BookOpen, Hash } from "lucide-react";

export default function WordList({ words, title, showPath = false, emptyMessage = "" }) {
  if (emptyMessage) {
    return (
      <Card className="bg-[var(--content-bg)] border border-[var(--border-color)] p-8 text-center">
        <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-lg mx-auto mb-4 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[var(--text-secondary)]" />
        </div>
        <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">{emptyMessage}</h3>
      </Card>
    );
  }

  if (words.length === 0) return null;

  const groupedWords = words.reduce((acc, wordObj) => {
    const length = wordObj.word.length;
    if (!acc[length]) acc[length] = [];
    acc[length].push(wordObj);
    return acc;
  }, {});

  const sortedLengths = Object.keys(groupedWords).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <Card className="bg-[var(--content-bg)] border border-[var(--border-color)] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-[var(--text-primary)]">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Hash className="w-4 h-4" />
          <span className="font-medium">{words.length} words</span>
        </div>
      </div>

      <div className="space-y-5">
        {sortedLengths.map(length => (
          <div key={length}>
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">
              {length}-Letter Words
            </h4>
            
            <div className="flex flex-wrap gap-2">
              {groupedWords[length].map((wordObj, index) => (
                <div 
                  key={`${wordObj.word}-${index}`}
                  className="bg-[var(--primary-bg)] rounded-md px-3 py-1 border border-[var(--border-color)]"
                >
                  <p className="font-medium text-[var(--text-secondary)] tracking-wide">
                      {wordObj.word}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
