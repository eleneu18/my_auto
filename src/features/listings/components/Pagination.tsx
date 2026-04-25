type PaginationProps = {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="mt-5 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-md bg-white px-3 py-2 text-[13px] disabled:opacity-40"
      >
        წინა
      </button>

      <span className="text-[13px] text-[#6F7383]">
        {currentPage} / {lastPage}
      </span>

      <button
        type="button"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-md bg-white px-3 py-2 text-[13px] disabled:opacity-40"
      >
        შემდეგი
      </button>
    </div>
  );
};

export default Pagination;
