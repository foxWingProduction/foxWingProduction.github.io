import { useEffect } from 'react';

interface LightboxProps {
  sources: string[];
  /** null when closed, otherwise the index on show. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/** Full-screen gallery viewer. Arrow keys page through, Escape closes. */
export function Lightbox({ sources, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const move = (d: number) =>
      onIndexChange((index! + d + sources.length) % sources.length);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, index, sources.length, onClose, onIndexChange]);

  const move = (d: number) =>
    onIndexChange(((index ?? 0) + d + sources.length) % sources.length);

  return (
    <div
      className={`lightbox${open ? ' open' : ''}`}
      id="lightbox"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      <button className="lightbox__nav prev" aria-label="Previous" onClick={() => move(-1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <img
        className="lightbox__img"
        src={index !== null ? sources[index] : undefined}
        alt="Enlarged on-set photograph"
      />
      <button className="lightbox__nav next" aria-label="Next" onClick={() => move(1)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
