"use client";

import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  created_at: number;
  movie_id: number;
  user_id: string;
  stripe_movie_id: string;
  stripe_price_id: string;
  movies: Movie;
  quantity: number;
}

interface Movie {
  title: string;
  imageSrc: string;
  price: number;
}
export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);


  const fetchCart = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`)
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();      
      setCart(data)
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
}

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart();  
  }, []);

  return { cart, setCart, fetchCart };
};
