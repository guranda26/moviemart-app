"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import useLocaleFromPath from "@/components/UsePath";
import { Order } from "@/Interfaces/Orders";
import { TiStarFullOutline } from "react-icons/ti";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true)
  const {t} = useTranslation()
  const locale = useLocaleFromPath();


  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("id, movie_name, quantity, created_at, movies(imageSrc, price, rating, description, title_ka, description_ka)")
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
  <h2 className="text-xl xs:text-3xl font-bold mb-8 text-center text-textCol">{t('checkout:orders_heading')}</h2>
  {orders.length === 0 ? (
    <h3 className="text-center">{t("checkout:empty_orders")}</h3>
  ) : (
    <div className="grid grid-cols-1 gap:1 xs:gap-2 sm:gap-4 max-w-screen">
      {orders.map((order) => (
        <div key={order.id} className="py-4 px-8 bg-bgOrder rounded shadow-md flex flex-row gap-8 card-col">
        <img
          src={order.movies?.imageSrc || "/assets/placeholder.png"} 
          alt={order.movie_name}
          className="w-full xs:w-[180px] h-60 xs:h-40 rounded object-contain mx-0 card-img"
        />
          <div className="text-left text-center">
          <h2 className="text-xl font-semibold mt-2 text-[#ccc]"><span className="text-[#ffd2a0] split-text">{t('products:movie_name')}</span>&nbsp; 
          {(locale === 'ka' ? order.movies?.title_ka : order.movie_name)}
          </h2>
          <p className="text-[#ccc]">💰 ${(order.movies?.price)}</p>
          <div className="flex items-center gap-1 text-[#ffd2a0] mx-0 text-center"><TiStarFullOutline /><p className="text-[#ccc]">{(order.movies?.rating)}</p></div>
          <p className="text-[#ccc] text-semibold description text-justify xs:text-left break-words">
          🎬 {(locale === 'ka' ? order.movies?.description_ka :order.movies?.description)}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
)
}
