import { useState } from "react";
import { Pagination } from "@prumo";

export default function Basic() {
  const [page, setPage] = useState(6);
  return (
    <Pagination page={page} pages={20} onPageChange={setPage} />
  );
}
