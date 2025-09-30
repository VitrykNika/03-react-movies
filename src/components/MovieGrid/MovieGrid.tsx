import type { Movie } from "../../types/movie";
import { tmdbImg } from "../../utils/image";
import styles from "./MovieGrid.module.css";

interface Props {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export const MovieGrid = ({ movies, onSelect }: Props) => {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((m) => {
        const src = tmdbImg(m.poster_path, "w500");

        return (
          <li key={m.id}>
            <div className={styles.card} onClick={() => onSelect(m)}>
              {src ? (
                <img
                  className={styles.image}
                  src={src}
                  alt={m.title}
                  loading="lazy"
                />
              ) : (
                <div className={styles.image}>No Poster</div>
              )}
              <h2 className={styles.title}>{m.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
};