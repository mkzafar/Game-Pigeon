export function createPageUrl(pageName: string): string {
  switch (pageName) {
    case "Home":
      return "/";
    case "AnagramSolver":
      return "/AnagramSolver";
    case "WordHuntSolver":
      return "/WordHuntSolver";
    default:
      return "/";
  }
}
