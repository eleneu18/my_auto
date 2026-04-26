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

  const getExciseRatePerCm3 = (ageYears: number) => {
    if (ageYears <= 0) return 0.05;
    if (ageYears === 1) return 0.1;
    if (ageYears === 2) return 0.2;
    if (ageYears === 3) return 0.4;
    if (ageYears === 4) return 0.5;
    if (ageYears === 5) return 0.6;
    if (ageYears === 6) return 0.7;
    if (ageYears <= 12) return 1.0;
    if (ageYears === 13) return 2.0;
    return 3.0;
  };

  const ELECTRIC_FUEL_TYPE_ID = 7;
  const HYBRID_FUEL_TYPE_IDS = new Set([5, 6]);

  export const calculateCustomsFee = (
    engineVolumeCm3: number,
    prodYear: number,
    fuelTypeId: number,
    referenceYear: number = new Date().getFullYear(),
  ): number => {
    if (fuelTypeId === ELECTRIC_FUEL_TYPE_ID) return 0;
    if (!engineVolumeCm3 || engineVolumeCm3 <= 0) return 0;

    const ageYears = Math.max(0, referenceYear - prodYear);
    let fee = engineVolumeCm3 * getExciseRatePerCm3(ageYears);

    if (engineVolumeCm3 > 3500) fee *= 1.5;
    if (HYBRID_FUEL_TYPE_IDS.has(fuelTypeId)) fee *= 0.6;

    return Math.round(fee);
  };

  export const formatCustomsFee = (
    engineVolumeCm3: number,
    prodYear: number,
    fuelTypeId: number,
  ): string => {
    const fee = calculateCustomsFee(engineVolumeCm3, prodYear, fuelTypeId);

    return `${formatNumber(fee)} ₾`;
  };