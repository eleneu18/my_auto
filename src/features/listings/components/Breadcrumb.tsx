import arrowRight from "../../../assets/images/arrow-icon.svg";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex items-center font-['Helvetica_Neue_LT_GEO'] text-[12px] font-normal leading-none tracking-[0px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-[#6F7383] transition hover:text-[#FD4100]"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={isLast ? "text-[#FD4100]" : "text-[#6F7383]"}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <img
                  src={arrowRight}
                  alt=""
                  aria-hidden="true"
                  className="h-[6px] w-[3px] shrink-0"
                  style={{
                    marginLeft: "8.2px",
                    marginRight: "7.2px",
                  }}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
