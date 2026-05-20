import { normalizeSearchText } from './searchEvents';

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function HighlightText({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;

  try {
    const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
    const parts = text.split(regex).filter((p) => p.length > 0);
    const qNorm = normalizeSearchText(q);

    return (
      <>
        {parts.map((part, i) =>
          normalizeSearchText(part) === qNorm ? (
            <mark key={i} className="highlight-match">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  } catch {
    return <>{text}</>;
  }
}
