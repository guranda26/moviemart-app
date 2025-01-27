"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingBlogs() {
  return (
    <section className="max-w-[1400px] grid gap-5 mx-auto">
      <div className="grid grid-cols-1">
        <div className="bg-gray-300 min-h-[130px] xs:min-h-[200px] h-auto md:min-h-[300px] animate-pulse shadow-md p-4">
          <Skeleton
            height="100%"
            width="100%"
            className="flex flex-col gap-3 py-4 px-6"
          />
          {/* <div className="mt-3">
            <Skeleton width="30%" height={20} className="mb-2" />
            <Skeleton width="60%" height={20} className="mb-4 xs:h-7" />
            <Skeleton
              width="100%"
              height={120}
              className="m-auto justify-self-end self-end"
            />
          </div> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array(4)
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
                <Skeleton width="60%" height={20} className="mb-4 xs:h-7" />
                <Skeleton
                  width="100%"
                  height={120}
                  className="m-auto justify-self-end self-end"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
