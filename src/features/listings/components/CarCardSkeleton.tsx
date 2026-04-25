const CarCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-[14px] bg-white md:flex md:min-h-[164px]">
      <div className="h-[210px] animate-pulse bg-slate-200 md:h-auto md:w-[182px] md:shrink-0" />

      <div className="flex flex-1 flex-col px-4 py-3">
        <div className="flex justify-between gap-4">
          <div className="space-y-3">
            <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-28 animate-pulse rounded bg-slate-200 md:hidden" />
          </div>

          <div className="hidden space-y-3 md:block">
            <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-24 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:max-w-[330px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#EEF0F3] pt-3">
          <div className="h-3 w-36 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
