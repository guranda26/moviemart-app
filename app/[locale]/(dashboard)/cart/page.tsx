"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";
import { MdDelete } from "react-icons/md";
import CheckoutButton from "@/components/CheckoutBtn";
// import RedirectToProductBtn from "../../../components/RedirectToProductPage";

const Page = () => {
  const { cart = [], fetchCart } = useCart();

  const onDelete = async (productId: number) => {
    console.log('deleting productId', productId);
    
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-from-cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the item from the cart");
      }

      await fetchCart();

      console.log('cart', cart);

      

    } catch (error) {
      console.error("Error deleting item:", error);
      alert("There was an error deleting the item. Please try again.");
    }
  };

  // const onUpdate = async (productId: number, newQuantity: number) => {
  //   if (cart) {
  //     const updatedCart = cart.map((item) =>
  //       item.movie_id === productId
  //         ? { ...item, quantity: newQuantity }
  //         : item
  //     );
  //     setCart(updatedCart);
  //   }
  // };

  const totalAmount = cart
    ? cart.reduce(
        (total, item) => total + item.movies.price * item.quantity,
        0
      )
    : 0;

  return (
    <div className="w-full min-h-screen md:w-[75vw] p-3 md:p-6 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Cart</h1>
      {cart ? (
        <>
          <div className="md:hidden">
            {cart.map((item, index) => (
              <div
                key={item.id}
                id={`${item.id}`}
                className="border-t p-2 flex justify-between items-center"
              >
                <img
                  src={item.movies.imageSrc}
                  alt={item.movies.title}
                  className="min-w-[20px] max-w-[45px] rounded-full mr-2"
                />
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-gray-700">
                    {item.movies.title}
                  </h2>
                  <p className="text-xs text-gray-600">
                    Price: ${item.movies.price}
                  </p>
                </div>
                {/* <form className="flex gap-2">
                  <input
                    type="number"
                    className="w-10 border border-gray-300 rounded-md p-1"
                    value={item.quantity}
                    min="1"
                    // onChange={(e) => {
                    //   const newQuantity = Number(e.target.value);
                    //   onUpdate(item.movie_id, newQuantity);
                    // }}
                  />
                </form> */}
                <div>
                  {/* <button className="text-red-600">
                    <MdDelete size={20} />
                  </button> */}
                  <button
                        className="text-red-600"
                        onClick={() => onDelete(item.movie_id)}
                        data-cy={`delete-btn-${index}`}
                      >
                        <MdDelete size={20} />
                      </button>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-md font-medium text-gray-700"></th>
                  <th className="px-4 py-3 text-md font-medium text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 text-md font-medium text-gray-700">
                    Price
                  </th>
                  <th className="px-4 py-3 text-md font-medium text-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={item.id}
                    id={`${item.id}`}
                    className={`border-t ${item.id}`}
                    data-cy={`cart-item-${index}`}
                  >
                    <td className="px-4 py-3">
                      <img
                        src={item.movies.imageSrc}
                        alt={item.movies.title}
                        className="min-w-[30px] max-w-[45px] rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      {item.movies.title}
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-center font-semibold">
                      {item.movies.price}&#36;
                    </td>
                    <td className="py-4 text-center">
                      <button
                        className="text-red-600"
                        onClick={() => onDelete(item.movie_id)}
                        data-cy={`delete-btn-${index}`}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h2 className="text-center text-gray-500 text-base sm:text-lg">
          Your cart is empty.
        </h2>
      )}
      <div className="flex flex-col sm:flex-row items-center justify-between p-2">
          <h2 className="md:text-2xl font-semibold flex items-center">
          Total Amount: {totalAmount}
          <span className="mt-1 translate-x-[-3px]">&#xFE69;</span>
        </h2>
        <div className="flex gap-1 md:gap-2 flex-wrap">
          {cart && cart.length > 0 && (
            <>
              <CheckoutButton cart={cart} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
