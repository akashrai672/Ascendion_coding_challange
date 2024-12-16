import axios from 'axios';
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (year: string, page: number): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page,
        primary_release_year: year,
        sort_by: 'popularity.desc',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchEditors = async (movieId: number): Promise<string[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });

    const editors = response.data.crew
      .filter((member: { known_for_department: string }) => member.known_for_department === 'Editing')
      .map((editor: { name: string }) => editor.name);

    return editors;
  } catch (error) {
    console.error('Error fetching editors:', error);
    return [];
  }
};
