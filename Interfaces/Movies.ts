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

  export interface MoviesInWishlist {
    id: number;
    name: string;
    type: string;
    language: string;
    year: number;
    comment?: string;
    comment_ka?: string;
    image_src?: string
  }

  export interface EditMovieFormProps {
    movie: MoviesInWishlist;
    onClose: () => void;
    onUpdate: (formData: MoviesInWishlist) => Promise<void>;
  }