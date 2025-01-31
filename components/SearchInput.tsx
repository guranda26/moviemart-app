"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import Image from "next/image";

const SearchInput = ({ initialSearchQuery }: { initialSearchQuery: string }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(false)
  const [searchPage, setSearchPage] = useState(false)
  const router = useRouter()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    router.push(`?q=${searchQuery}`); 
    setSearchPage(true)
    setLoading(false);
  };

  const handleClearSearch = () => {
    setLoading(true);
    setSearchQuery("");
    setSearchPage(false)
    router.push("/"); 
    setLoading(false);
  };

  if (loading) return <Loading />

  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] z-40">
      <form onSubmit={handleSearchSubmit} className="w-auto max-w-md mx-auto flex items-center relative">
      <Image width={20} height={20} src="/assets/search-icon.svg" alt="search icon" className="absolute left-3" />
        <input
          id="search"
          name="q"
          type="search"
          placeholder="Search movies by title"
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={handleClearSearch}
          className="w-[400px] p-2 pl-10 border border-redButton rounded shadow-sm md:bg-[#e8ceb595] text-black"
        />
        {searchQuery && searchPage ? (
          <button
            type="button"
            onClick={handleClearSearch}
            className="ml-2 bg-redButton hover:bg-hoverRedBtn text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        ) : ( 
        <button
          type="submit"
          className="ml-2 bg-purpleButton hover:bg-hoverPurpleBtn text-white px-4 py-2 rounded"
        >
          Search
        </button>)}
      </form>
    </div>
  );
};

export default SearchInput;