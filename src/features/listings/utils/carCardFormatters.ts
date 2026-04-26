export const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US").format(price);
  
  export const formatNumber = (value: number) =>
    new Intl.NumberFormat("ka-GE").format(value);
  
  export const getLocationLabel = (
    locationId: number,
    parentLocationId: number,
  ) => {
    if (locationId === 2) return "თბილისი";
    if (locationId === 15) return "რუსთავის ავტო";
    if (parentLocationId === 0) return "გზაში";
  
    return "გზაში";
  };
  
  export const formatRelativeDate = (date: string) => {
    const diffMs = Date.now() - new Date(date).getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  
    if (diffDays === 0) return "დღეს";
    if (diffDays === 1) return "1 დღის წინ";
  
    return `${diffDays} დღის წინ`;
  };