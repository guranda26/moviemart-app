'use client'

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const MovieComponent = ({src}: {src:string}) => {
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const {t} = useTranslation()
  const watchTrailer = () => {
    setIsTrailerVisible(true);
  };

  const closeTrailer = () => {
    setIsTrailerVisible(false);
  };

  return (
    <div className="absolute top-0 right-1/2">
      <button
        className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-redButton text-textCol gap-2 hover:bg-hoverRedBtn text-sm sm:text-base h-10 sm:h-12 px-4 xs:px-8 sm:px-10 w-full text-white"
        onClick={watchTrailer}
        data-cy="buy-product"
      >
        {t('movie_details:watch_now')}
      </button>

      {isTrailerVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              onClick={closeTrailer}
              className="absolute top-0 right-1 text-black hover:text-gray-900 text-xl w-8 h-8"
            >
              &times;
            </button>
            <iframe
              width="560"
              height="315"
              src={src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieComponent;