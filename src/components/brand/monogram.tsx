export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 108 80" fill="none" className={className} aria-hidden="true">
      <path d="M8 18 L17 58 L31 31 L45 58 L54 18" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 18 C57 18 57 58 80 58 C103 58 103 18 80 18 Z M81 45 L96 64" stroke="#8BBCFF" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
