export interface Movies {
  id: number;
  imageSrc: string;
  title: string;
  title_ka: string;
  description: string;
  category: string;
  category_ka: string;
  rating: number;
  year: number;
}

export interface MovieData {
  movies: Movies[];
}
