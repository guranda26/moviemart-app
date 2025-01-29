"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const SearchInput = ({ initialSearchQuery }: { initialSearchQuery: string }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(false)
  const [searchPage, setSearchPage] = useState(false)
  const router = useRouter();

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
    router.push("/"); 
    setLoading(false);
  };

  if (loading) return <Loading />

  return (
    <div className="mb-8">
      <form onSubmit={handleSearchSubmit} className="w-full max-w-md mx-auto flex items-center gap-2">
        <input
          id="search"
          name="q"
          type="search"
          placeholder="Search movies by title"
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={handleClearSearch}
          className="w-full p-2 pl-10 border rounded shadow-sm bg-[#363636] md:bg-inputCol text-white"
        />

        {searchQuery && searchPage ? (
          <button
            type="button"
            onClick={handleClearSearch}
            className="ml-2 bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        ) : ( 
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>)}


        {/* {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="ml-2 text-white bg-transparent hover:text-gray-400"
          >
            X
          </button>
        )} */}
      </form>
    </div>
  );
};

export default SearchInput;