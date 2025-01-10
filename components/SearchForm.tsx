import React from "react";
import SearchFormReset from "./SearchFormReset";
//lucide-react is a dependency of shadcn which provides all types of great icons in react
import { Search } from "lucide-react";

const SearchForm = ({query}:{query:string}) => {

//const query = 'Test'; * This was a default query for testing the search form

  return (
   <form action="/" 
   //scroll={false}
   className="search-form"
   >
  <input name="query"
  defaultValue={query}
  className="search-input"
  placeholder="Search Startups"
  />
  <div className="flex gap-2">
   {query && <SearchFormReset />}
   <button type="submit" className="search-btn text-white">
    <Search className="size-5"/>
   </button>
  </div>
   </form>
  );
}
export default SearchForm