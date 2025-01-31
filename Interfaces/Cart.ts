
interface Movie {
  title: string;
  price: number;
  imageSrc?: string;
}

interface CartItem {
  stripe_price_id: string;
  quantity: number;
  stripe_movie_id: string;
  movies: Movie;
}

export interface CheckoutButtonProps {
  cart: CartItem[];
}