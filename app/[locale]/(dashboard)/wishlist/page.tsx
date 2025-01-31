
'use client'

import FetchMovies from '@/components/FetchWishlistMovies';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";

const MoviesInWishlist = () => {

  interface MoviesInWishlist {
    id: number;
    name: string;
    type: string;
    language: string;
    year: number;
    comment?: string;
    image_src?: string
  }

  const [posts, setPosts] = useState<MoviesInWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wishlistMovies = async () => {
      try {
        const posts = await FetchMovies();
        // console.log("posts", posts);
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
    console.log('deleting productId', movieId);
    
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

      console.log('posts', posts);

      

    } catch (error) {
      console.error("Error deleting item:", error);
      alert("There was an error deleting the item. Please try again.");
    }
  };

  if(isLoading) return <Loading />

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-background text-textCol">
      <h2 className="text-4xl font-bold text-center mb-8">Wishlist Movies</h2>
      {posts.length > 0 && (
        <div className="text-center my-10">
          <p className="text-xl text-gray-600 mb-4">
            Want to add more movies to the wishlist?
          </p>
          <Link
            href="/wishlist-form"
            className="inline-block bg-redButton text-white px-6 py-3 rounded-lg hover:bg-hoverRedBtn transition-colors duration-300"
          >
            Fill the Form
          </Link>
        </div>
      )}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ id, name, type, language, year, comment, image_src }) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            >
            <div className='w-[100%]'>
              <button onClick={() => onDelete(id)} className='bg-redButton hover:bg-hoverRedBtn p-2 rounded-md ml-auto'><RiDeleteBin5Fill />
              </button>
            </div>
              <div className="relative h-48 w-full">
                <Image
                  src={image_src || '/assets/placeholder.png'}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{name}</h3>
                <p className="text-lg text-gray-600 mb-1">
                  <span className="font-medium">Type:</span> {type}
                </p>
                <p className="text-lg text-gray-600 mb-1">
                  <span className="font-medium">Language:</span> {language}
                </p>
                <p className="text-lg text-gray-600 mb-1">
                  <span className="font-medium">Year:</span> {year}
                </p>
                {comment && (
                  <p className="text-lg text-gray-600 mb-1">
                    <span className="font-medium">Comment:</span> {comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600 mb-4">No movies in the wishlist yet.</p>
          <Link
            href="/wishlist-form"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Add a Movie
          </Link>
        </div>
      )}
    </section>
  );
};


export default MoviesInWishlist
