"use client";
import qs from "query-string";
import React, { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const url = qs.stringifyUrl({ url: "/", query: { q: value } }, { skipEmptyString: true });
    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form className="relative w-full flex items-center lg:w-[400px]" onSubmit={onSubmit}>
      <Input
        className=" focus-visible:ring-transparent"
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground hover:opacity-50 transition"
          onClick={onClear}
        />
      )}
      <Button type="submit" size="sm" variant="secondary">
        <SearchIcon className="h-5 w-5 text-m" />
      </Button>
    </form>
  );
};

export default Search;
