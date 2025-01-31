"use client";

import { CartItems } from "@/Interfaces/Cart";
import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState<CartItems[]>([]);


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
