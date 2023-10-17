import { useState } from 'react';

export const useSearch = (searchTerm = ``) => {
  const [search, setSearch] = useState(searchTerm);

  const handleSearchChange = (event: any) => {
    const value = event.target.value;
    if (value.length >= 3) {
      setSearch(value);
    } else {
      setSearch(``); // or you can keep the value without triggering a search
    }
  };

  return {
    search,
    handleSearchChange,
  };
};
