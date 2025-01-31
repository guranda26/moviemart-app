'use client'

import FetchMovies from '@/components/FetchWishlistMovies';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EditMovieForm from '@/components/EditMovieForm';
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { MoviesInWishlist } from '@/Interfaces/Movies';
import useLocaleFromPath from '@/components/UsePath';
import LoadingWishlist from '@/components/LoadingWishlist';

const MoviesInWishlistPage = () => {
  const [posts, setPosts] = useState<MoviesInWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState<MoviesInWishlist | null>(null);
  const {t} = useTranslation()
  const locale = useLocaleFromPath();

  useEffect(() => {
    const wishlistMovies = async () => {
      try {
        const posts = await FetchMovies();
        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    wishlistMovies();
  }, []);

  const onDelete = async (movieId: number) => {    
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete-wishlist`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId }),
        }
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== movieId));
      if (!response.ok) {
        throw new Error("Failed to delete the item from the cart");
      }
      await FetchMovies();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("There was an error deleting the item. Please try again.");
    }
  };

  const onUpdate = async (updatedMovie: MoviesInWishlist) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist-update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMovie),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update the movie");
      }

      const updatedPosts = await FetchMovies();
      setPosts(updatedPosts);
      setEditingMovie(null)
      toast.success("Movie updated successfully!");
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("There was an error updating the movie. Please try again.");
    }
  }


  if(isLoading) return (
      <LoadingWishlist /> 
   
  )

  return (
    <section className="max-w-6xl mx-auto px-2 xs:px-6 py-12 bg-background text-textCol">
      <h2 className="text-2xl xs:text-4xl font-bold text-center mb-8 break-all">{t("wishlist:wishlist_txt")}</h2>
      {posts.length > 0 && (
        <div className="text-center my-10">
          <p className="text-lg xs:text-xl text-textCol mb-4">
            {t("wishlist:add_movies")}
          </p>
          <Link
            href="/wishlist-form"
            className="inline-block bg-redButton text-white px-6 py-3 rounded-lg hover:bg-hoverRedBtn transition-colors duration-300 break-all"
          >
          {t("wishlist:fill_form_txt")}
          </Link>
        </div>
      )}
      {posts.length > 0 ? (
        <div className="max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto pt-4 sm:pt-2">
          {posts.map(({ id, name, type, language, year, comment, comment_ka, image_src }) => (
            <div
              key={id}
              className="sm:transform sm:transition-transform sm:duration-300 sm:hover:scale-105 sm:hover:shadow-lg animate-fade-in relative"
              >
              <div className="relative h-48 w-full">
              <div className='w-[100%] p-2 flex justify-center flex-1 mt-auto relative top-0 z-40 text-white'>
              <button
                  onClick={() => setEditingMovie({ id, name, type, language, year, comment, image_src })}
                  className="bg-[#00000094] hover:bg-[#38383894] p-2 rounded-md mr-2"
                >
                  <RiEdit2Fill />
                </button>
              <button onClick={() => onDelete(id)} className='bg-redButton hover:bg-hoverRedBtn p-2 rounded-md ml-auto'><RiDeleteBin5Fill />
              </button>
            </div>
                <Image
                  src={image_src || '/assets/placeholder.png'}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 bg-profileBg min-h-[270px] text-textCol">
                <h3 className="text-2xl font-semibold mb-2">{name}</h3>
                <p className="text-lg">
                  <span className="font-medium">{t("wishlist:type")}</span> {type}
                </p>
                <p className="text-lg mb-1">
                  <span className="font-medium">{t("wishlist:language")}</span> {language}
                </p>
                <p className="text-lg mb-1">
                  <span className="font-medium">{t("wishlist:year")}</span> {year}
                </p>
                {comment && locale !== 'ka' && (
                  <p className="text-lg mb-1">
                    <span className="font-medium">{t("wishlist:comment")}</span> {comment}
                  </p>
                )}
                {comment_ka && locale === 'ka' && (
                  <p className="text-lg mb-1">
                    <span className="font-medium">{t("wishlist:comment")}</span> {comment_ka}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600 mb-4">{t("wishlist:no_movies")}</p>
          <Link
            href="/wishlist-form"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          > 
            {t("wishlist:add_movie")}
          </Link>
        </div>
      )}
       {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onClose={() => setEditingMovie(null)}
          onUpdate={onUpdate}
        />
      )}
    </section>
  );
};

export default MoviesInWishlistPage
