import { DICTIONARY } from "../data/dictionary";

// --------- TRIE IMPLEMENTATION ---------
class TrieNode {
  children: Record<string, TrieNode> = {};
  isEndOfWord = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  hasPrefix(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }

  hasWord(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
}

// --------- BUILD TRIE ---------
const trie = new Trie();
for (const word of DICTIONARY) {
  if (word.length >= 3) trie.insert(word); 
}

// --------- SOLVE ANAGRAM (UNSCRAMBLE) ---------
export async function solveAnagram(letters: string) {
  const chars = letters.toUpperCase().split("");
  const results: { word: string; length: number; definition: string }[] = [];

  for (const word of DICTIONARY) {
    if (word.length < 2) continue;

    const pool = [...chars];
    let valid = true;

    for (const c of word) {
      const i = pool.indexOf(c);
      if (i === -1) {
        valid = false;
        break;
      }
      pool.splice(i, 1);
    }

    if (valid) {
      results.push({
        word,
        length: word.length,
        definition: "" // Optional feature for later
      });
    }
  }

  results.sort((a, b) => b.length - a.length || a.word.localeCompare(b.word));
  return results;
}

// --------- SOLVE WORDHUNT  ---------
export function solveWordHunt(grid: string[][]) {
  const results = new Set<string>();
  const numRows = grid.length;
  const numCols = grid[0].length;

  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1],
  ];

  const visited = Array.from({ length: numRows }, () =>
    Array(numCols).fill(false)
  );

  function dfs(x: number, y: number, word: string) {
    if (!trie.hasPrefix(word)) return; 

    if (word.length >= 3 && trie.hasWord(word)) {
      results.add(word);
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < numRows &&
        ny < numCols &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        dfs(nx, ny, word + grid[nx][ny]);
        visited[nx][ny] = false;
      }
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      visited[i][j] = true;
      dfs(i, j, grid[i][j]);
      visited[i][j] = false;
    }
  }

  return Array.from(results)
    .map((word) => ({ word, length: word.length, definition: "" }))
    .sort((a, b) => b.length - a.length || a.word.localeCompare(b.word));
}
