export type Product = {
    car_id: number;
    rent_car_id: number | null;
    status_id: number;
    photo: string;
    pic_number: number;
    prod_year: number;
    prod_month: number;
    man_id: number;
    model_id: number;
    car_model: string;
    price: number;
    price_usd: number;
    price_value: number;
    fuel_type_id: number;
    gear_type_id: number;
    drive_type_id: number;
    car_run: number;
    car_run_km: number;
    car_run_dim: number;
    engine_volume: number;
    customs_passed: boolean;
    for_rent: boolean;
    currency_id: number;
    vehicle_type: number;
    category_id: number;
    location_id: number;
    parent_loc_id: number;
    order_date: string;
    photo_ver: number;
    views: number;
    daily_views: {
      views: number;
      product_id: number;
      insert_Date: string;
    } | null;
    comfort_features: number[];
  };
  
  export type ProductsMeta = {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
  
  export type ProductsResponse = {
    statusCode: number;
    statusMessage: string;
    data: {
      items: Product[];
      meta: ProductsMeta;
    };
    versioning?: unknown;
  };

  export type Manufacturer = {
    man_id: string;
    man_name: string;
    is_car: "0" | "1";
    is_spec: "0" | "1";
    is_moto: "0" | "1";
  };
  
  export type CarModel = {
    model_id: number;
    man_id: number;
    model_name: string;
    is_car: boolean;
    is_moto: boolean;
    is_spec: boolean;
  };
  
  export type Category = {
    category_id: number;
    category_type: number;
    has_icon: number;
    title: string;
    seo_title: string;
    vehicle_types: number[];
  };
  
  export type SortOrder = 1 | 2 | 3 | 4 | 5 | 6;
  export type Period = "1h" | "2h" | "3h" | "1d" | "2d" | "3d" | "1w" | "2w" | "3w";
  
  export type ProductFilters = {
    forRent?: 0 | 1;
    mans?: string;
    cats?: string;
    priceFrom?: number;
    priceTo?: number;
    period?: Period;
    sortOrder?: SortOrder;
    page?: number;
  };