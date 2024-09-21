import { useEffect, useState } from 'react';

const KEY = '51c3aa04';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // callback?.();
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setError('');
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apiKey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }
        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');
        setMovies(data.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    // onCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
