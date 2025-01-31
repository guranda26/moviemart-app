"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const SearchInput = ({ initialSearchQuery }: { initialSearchQuery: string }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [loading, setLoading] = useState(false)
  const [searchPage, setSearchPage] = useState(false)
  const router = useRouter()
  const {t} = useTranslation()

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
    <div className="z-40 search-input">
      <form onSubmit={handleSearchSubmit} className="w-auto max-w-[600px] sm:max-w-md mx-auto flex flex-wrap items-center relative">
      <Image width={20} height={20} src="/assets/search-icon.svg" alt="search icon" className="absolute left-3 search-icon__hide" />
        <input
          id="search"
          name="q"
          type="search"
          placeholder={t("common_placeholder:search_movie")}
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={handleClearSearch}
          className="w-max-content sm:w-[250px] md:w-[300px] sm:max-w-full lg:w-[300px] p-2 pl-10 border border-redButton rounded shadow-sm md:bg-[#e8ceb595] text-black search-placeholder"
        />
        {searchQuery && searchPage ? (
          <button
            type="button"
            onClick={handleClearSearch}
            className="ml-2 bg-redButton hover:bg-hoverRedBtn text-white px-4 py-2 rounded search-button"
          >
            <span className="search-text">
              {t("common_placeholder:reset")}
            </span>
            <Image width={20} height={20} src="/assets/search-icon.svg" alt="search icon" className="hidden search-img" />
          </button>
        ) : ( 
        <button
          type="submit"
          className="ml-2 bg-purpleButton hover:bg-hoverPurpleBtn text-white px-4 py-2 rounded search-button"
        > 
        <span className="search-text">
          {t("common_placeholder:search")}
        </span>
        <Image width={20} height={20} src="/assets/search-icon.svg" alt="search icon" className="hidden search-img" />
        </button>)}
      </form>
    </div>
  );
};

export default SearchInput;