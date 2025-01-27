import { BlogData } from "@/Interfaces/Blogs";
import React, { Suspense } from "react";
import AutoPlayVideo from "../VideoAutoPlay";
import Loading from "../Loading";
import useLocaleFromPath from "../UsePath";

const bannerUrl = "/assets/banner-video.mp4";

const BlogList = ({ posts }: { posts: BlogData[] }) => {
  const locale = useLocaleFromPath();

  console.log("fetch posts", locale);

  return (
    <section className="min-h-screen max-w-screen p-4">
      <section className="text-textCol mx-auto">
        <Suspense fallback={<Loading />}>
          <AutoPlayVideo src={bannerUrl} width="auto" />
        </Suspense>
      </section>
      <ul className="max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto pt-4 sm:pt-2">
        {posts.map(
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
              <li key={id} className="flex-1 lg:max-w-[360px w-[100%]">
                <div className="h-[250px] lg:max-w-[360px] relative overflow-y-hidden">
                  <img
                    src={imageSrc}
                    alt="blog"
                    className="xs:flex-1 lg:max-w-[100%] object-cover min-h-[100%] lg:object-contain"
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
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};

export default BlogList;
