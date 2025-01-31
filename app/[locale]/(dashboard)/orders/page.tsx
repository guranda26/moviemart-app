"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Loading from "@/components/Loading";

interface Movie {
  imageSrc: string;
  price: number;
  rating: number;
  description?: string;
}

interface Order {
  id: number;
  movie_name: string;
  quantity: number;
  created_at: string; 
  movies: Movie;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("id, movie_name, quantity, created_at, movies(imageSrc, price, rating, description)")
        .order("created_at", { ascending: false });

      setLoading(false)

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as unknown as Order[]);
      }
    }

    fetchOrders();
  }, []);

  if(loading) return <Loading />


return (
<div className="p-6">
  <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
  {orders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order) => (
        <div key={order.id} className="py-4 px-8 bg-bgOrder rounded shadow-md items-center xs:items-normal flex flex-col xs:flex-row gap-8">
          <img
            src={order.movies?.imageSrc || "/assets/placeholder.png"} 
            alt={order.movie_name}
            className="w-auto xs:w-auto h-60 xs:h-40 rounded object-contain"
          />
          <div className="text-center xs:text-left">
          <h2 className="text-xl font-semibold mt-2 text-[#ccc]"><span className="text-[#ffd2a0]">Movie Name:</span> {order.movie_name}</h2>
          <p className="text-[#ccc]">Price: ${(order.movies?.price)}</p>
          <p className="text-[#ccc]">Rating: {(order.movies?.rating)}</p>
          <p className="text-[#ccc] text-semibold description text-justify xs:text-left">{(order.movies?.description)}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
)
}
