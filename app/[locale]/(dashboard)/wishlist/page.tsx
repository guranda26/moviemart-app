
'use client'

import FetchMovies from '@/components/FetchWishlistMovies';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MoviesInWishlist = () => {

  interface MoviesInWishlist {
    id: string;
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
