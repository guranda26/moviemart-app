import { BlogData } from "@/Interfaces/Blogs";
import Image from "next/image";
import React, { Suspense } from "react";
import AutoPlayVideo from "./VideoAutoPlay";

const BlogList = ({ posts }: { posts: BlogData[] }) => {
  return (
    <section className="bg-black min-h-screen max-w-screen p-4">
      <section className="text-white mx-auto">
        <Suspense fallback={<p>Loading video...</p>}>
          <AutoPlayVideo src="/assets/banner.mp4" width="auto" />
        </Suspense>
      </section>
      <ul className="max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-auto">
        {posts.map((post) => (
          <li key={post.id} className="flex-1 lg:max-w-[360px w-[100%]">
            <div className="min-h-[250px] max-w-[100%] relative">
              <Image
                fill={true}
                src={post.imageSrc}
                alt="blog"
                className="xs:flex-1 lg:max-w-[360px] object-cover xs:object-fill"
              />
            </div>
            <div className="flex flex-col gap-3 bg-white py-4 px-6 min-h-[270px] shadow-custom-inner">
              <p>{post.date}</p>
              <div className="flex flex-wrap xs:inline-flex gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    className="border-2 border-black rounded xs:p-1.5 p-1 text-xs tracking-wide font-medium"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="m-auto justify-self-end self-end text-xl xs:text-2xl font-semibold">
                {post.title}
              </h3>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BlogList;
