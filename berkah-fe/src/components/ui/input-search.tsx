import { useState } from "react";
import { Input } from "./input";
import { Search } from "lucide-react";
import { useDebounce } from "react-use";
import { useSearchParams } from "react-router-dom";

export function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useDebounce(
    () => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("query", searchTerm);
        params.set("page", "1");
      } else {
        params.delete("query");
        params.set("page", "1");
      }
      setSearchParams(params);
    },
    300,
    [searchTerm],
  );

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Cari produk..."
        className="py-2 pl-9 pr-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
