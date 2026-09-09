import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button.jsx";

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { page, totalPages, totalItems, hasPrevPage, hasNextPage } = pagination;

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-4 sm:flex-row">
      <p className="text-xs text-slate-500">
        Page {page} of {totalPages} &middot; {totalItems} total
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
