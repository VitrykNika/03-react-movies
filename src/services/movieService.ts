import { http } from "./http";
import type { Movie } from "../types/movie";

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<SearchMoviesResponse> {
  const { data } = await http.get<SearchMoviesResponse>("/search/movie", {
    params: { query, language: "en-US", include_adult: false, page: 1 },
  });
  return data;
}