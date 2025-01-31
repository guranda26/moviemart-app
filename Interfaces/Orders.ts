interface Movie {
  imageSrc: string;
  price: number;
  rating: number;
  title_ka: string;
  description?: string;
  description_ka?: string;
}

export interface Order {
  id: number;
  movie_name: string;
  quantity: number;
  created_at: string; 
  movies: Movie;
}