"use client";
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  totalPages: number;
  pageName: string
};
export default function Pagination({ page, totalPages ,pageName}: PaginationProps) {
  const router = useRouter();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handlePagination = (pageNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNumber.toString());
    router.push(`/${pageName}?${params.toString()}`);
  };
  const prevNextClass =
    "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium" +
    "text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed";
  return (
    <div className="flex items-center justify-center gap-2 my-4">
      <button
        disabled={page === 1}
        onClick={() => handlePagination(page - 1)}
        className={prevNextClass}
      >
        Prev
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
          className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
            page === pageNumber
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => handlePagination(page + 1)}
        className={prevNextClass}
      >
        Next
      </button>
    </div>
  );
}
