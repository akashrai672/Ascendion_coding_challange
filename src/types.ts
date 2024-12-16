export interface Movie {
    title: string;
    release_date: string;
    vote_average: number;
    editors: string[];
  }
  
  export interface MovieCredits {
    id: number;
    crew: {
      name: string;
      known_for_department: string;
    }[];
  }
  