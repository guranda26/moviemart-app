export interface Movies {
  id: number;
  imageSrc: string;
  title: string;
  title_ka: string;
  description: string;
  category: string;
  category_ka: string;
  rating: number;
  price: number;
  year: number;
  bannerImg?: string;
  type?: string;
  type_ka?: string;
}

export interface MovieData {
  movies: Movies[];
}
