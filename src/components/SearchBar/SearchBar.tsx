import { useRef } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  onSearch: (query: string) => void | Promise<void>;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData): Promise<void> => {
    const raw = formData.get("query");
    const query = typeof raw === "string" ? raw.trim() : "";

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    try {
      await onSearch(query);
      formRef.current?.reset();
    } catch {
      toast.error("Search failed. Please try again.");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form ref={formRef} className={styles.form} action={handleAction}>
          <label htmlFor="search-input" className="visually-hidden">
            Search movies
          </label>
          <input
            id="search-input"
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
            aria-label="Search movies"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};