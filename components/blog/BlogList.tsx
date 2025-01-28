"use client";

import { BlogData } from "@/Interfaces/Blogs";
import React, { Suspense, useState } from "react";
import AutoPlayVideo from "../VideoAutoPlay";
import Loading from "../Loading";
import useLocaleFromPath from "../UsePath";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Input from "../Input";
import { useTranslation } from "react-i18next";

const bannerUrl = "/assets/banner-video.mp4";

const BlogList = ({ posts }: { posts: BlogData[] }) => {
  const locale = useLocaleFromPath();

  const [searchQuery, setSearchQuery] = useState("");

  const { t } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const localizedTitle = locale === "ka" ? post.title_ka : post.title;
    const localizedTags =
      locale === "ka"
        ? [post.tags_ka__001, post.tags_ka__002, post.tags_ka__003]
        : [post.tags__001, post.tags__002, post.tags__003];
    const matchTitle = localizedTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchTags = localizedTags.some(
      (tag) => tag && tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchTitle || matchTags;
  });

  return (
    <section className="min-h-screen max-w-screen p-4">
      <section className="text-textCol mx-auto relative">
        <Suspense fallback={<Loading />}>
          <AutoPlayVideo src={bannerUrl} width="auto" />
        </Suspense>
        <div className="mb-[10px] my-4 md:absolute bottom-0 md:top-[145px] left-[30px] md:w-[350px]">
          <div className="relative">
            <Input
              id="search"
              name="search"
              type="text"
              placeholder={t("products:search_text")}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 pl-10 border rounded shadow-sm bg-[#363636] md:bg-inputCol text-white"
            />
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
      </section>

      <ul className="max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto pt-4 sm:pt-2">
        {filteredPosts.map(
          ({
            id,
            title,
            title_ka,
            imageSrc,
            date,
            date_ka,
            tags__001,
            tags__002,
            tags__003,
            tags_ka__001,
            tags_ka__002,
            tags_ka__003,
          }) => {
            const localizedTags =
              locale === "ka"
                ? [tags_ka__001, tags_ka__002, tags_ka__003]
                : [tags__001, tags__002, tags__003];
            const localizedTitle = locale === "ka" ? title_ka : title;

            return (
              <li
                key={id}
                className="sm:transform sm:transition-transform sm:duration-300 sm:hover:scale-105 sm:hover:shadow-lg animate-fade-in"
              >
                <Link
                  href={`blogs/${id}`}
                  className="flex-1 lg:max-w-[360px w-[100%]"
                >
                  <div className="h-[250px] lg:max-w-[360px] relative overflow-y-hidden bg-black">
                    <img
                      src={imageSrc}
                      alt="blog"
                      className="xs:flex-1 lg:max-w-[100%] object-cover min-h-[100%] bg-center"
                    />
                  </div>
                  <div className="flex flex-col gap-3 bg-white py-4 px-6 min-h-[270px] sm:h-[270px] shadow-custom-inner">
                    <p>{locale === "ka" ? date_ka : date}</p>
                    <div className="flex flex-wrap xs:inline-flex gap-2">
                      {localizedTags.map(
                        (tag, index) =>
                          tag && (
                            <span
                              key={index}
                              className="border-2 border-black rounded xs:p-1.5 p-1 text-xs tracking-wide font-medium"
                            >
                              {tag}
                            </span>
                          )
                      )}
                    </div>
                    <h3 className="m-auto justify-self-end self-end text-xl xs:text-2xl font-semibold truncate-with-arrow">
                      {localizedTitle}
                    </h3>
                  </div>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};

export default BlogList;
