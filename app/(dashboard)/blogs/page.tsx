"use client";

import React, { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import FetchPosts from "@/components/blog/BlogData";
import BlogList from "@/components/blog/BlogList";
import LoadingBlogs from "@/components/blog/BlogcardLoader";

export default function SkeletonLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await FetchPosts();
        setPosts(posts.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <section className="min-h-screen max-w-screen p-4 pt-14 text-[#161616]">
      {isLoading ? <LoadingBlogs /> : <BlogList posts={posts} />}
    </section>
  );
}
