import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { tmdbImg } from "../../utils/image";

interface Props {
  movie: Movie | null;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: Props) => {
  useEffect(() => {
    if (!movie) return;

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
  }, [movie, onClose]);

  if (!movie) return null;

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
      onClick={handleBackdrop}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {backdrop ? (
          <img src={backdrop} alt={movie.title} className={styles.image} />
        ) : (
          
          <div className={styles.image} />
        )}

        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview || "No overview."}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "—"}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};