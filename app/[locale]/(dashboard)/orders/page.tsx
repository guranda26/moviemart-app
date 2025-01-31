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
  <h2 className="text-3xl font-bold mb-4 text-center text-textCol">{t('checkout:orders_heading')}</h2>
  {orders.length === 0 ? (
    <h3 className="text-center">{t("checkout:empty_orders")}</h3>
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
          <h2 className="text-xl font-semibold mt-2 text-[#ccc]"><span className="text-[#ffd2a0]">{t('products:movie_name')}</span>&nbsp; 
          {(locale === 'ka' ? order.movies?.title_ka : order.movie_name)}
          </h2>
          <p className="text-[#ccc]">💰 ${(order.movies?.price)}</p>
          <div className="flex items-center gap-1 text-[#ffd2a0]"><TiStarFullOutline /><p className="text-[#ccc]">{(order.movies?.rating)}</p></div>
          <p className="text-[#ccc] text-semibold description text-justify xs:text-left">
          🎬 {(locale === 'ka' ? order.movies?.description_ka :order.movies?.description)}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
)
}
