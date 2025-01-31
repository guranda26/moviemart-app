
interface Movie {
  title: string;
  price: number;
  imageSrc?: string;
}

interface CartItem {
  user_id: string;
  movie_id?: number;
  stripe_price_id: string;
  quantity: number;
  stripe_movie_id: string;
  movies: Movie;
}

export interface CartItems {
  id: number;
  created_at: number;
  movie_id: number;
  user_id: string;
  stripe_movie_id: string;
  stripe_price_id: string;
  movies: Movie;
  quantity: number;
}

export interface CheckoutButtonProps {
  cart: CartItem[];
}