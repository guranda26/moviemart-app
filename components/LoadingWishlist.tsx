"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingWishlist() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-2 xs:px-6 py-12">
        <div className="bg-gray-300 min-h-[130px] xs:min-h-[200px] h-auto text-center mb-10">
          <Skeleton width="30%" height={20} className="text-center mt-8" />
          <div className="text-center my-10">
            <Skeleton width="30%" height={20} className="mb-4 xs:h-7 text-center" />
            <Skeleton width="10%" height={20} className="px-6 py-3 xs:h-7 text-center" />
          </div>
        </div>
    <div className="max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto pt-4 sm:pt-2">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 h-[520px] animate-pulse shadow-md p-4"
            >
              <Skeleton
                height={200}
                width="100%"
                className="flex flex-col gap-3 py-4 px-6"
              />
              <div className="mt-3">
                <Skeleton width="30%" height={20} className="mb-2" />
                <Skeleton width="60%" height={20} className="mb-2 xs:h-7" />
                <Skeleton width="60%" height={20} className="mb-2 xs:h-7" />
                <Skeleton width="60%" height={20} className="mb-2 xs:h-7" />
                <Skeleton
                  width="100%"
                  height={100}
                  className="m-auto justify-self-end self-end"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
