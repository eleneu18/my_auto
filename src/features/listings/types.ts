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