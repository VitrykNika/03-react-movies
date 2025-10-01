import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { tmdbImg } from "../../utils/image";

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const backdrop = tmdbImg(movie.backdrop_path, "original");

  return createPortal(
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${movie.title} details`}
      onClick={handleBackdrop}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      tabIndex={-1}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>

        {backdrop ? (
          <img src={backdrop} alt={movie.title} className={styles.image} />
        ) : (
          <div className={styles.image} aria-hidden="true" />
        )}

        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.overview}>{movie.overview || "No overview."}</p>
          <p className={styles.meta}>
            <strong>Release Date:</strong> {movie.release_date || "—"}
          </p>
          <p className={styles.meta}>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};