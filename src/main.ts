import express from 'express';
import { fetchMovies, fetchEditors } from './utils';
import { Movie } from './types';

const app = express();
const port = process.env.PORT || 3000;

app.get('/movies/:year', async (req, res) => {
  const { year } = req.params;
  const page = Number(req.query.page) || 1; // Default to page 1 if not provided

  try {
    const moviesData = await fetchMovies(year, page);
    const movies: Movie[] = await Promise.all(
      moviesData.map(async (movie: any) => {
        const editors = await fetchEditors(movie.id);
        return {
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          editors,
        };
      })
    );

    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
