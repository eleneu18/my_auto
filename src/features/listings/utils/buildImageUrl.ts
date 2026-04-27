import { STATIC_BASE_URL } from "../../../shared/api/endpoints";
import type { Product } from "../types";

export const buildImageUrl = (product: Product, imageIndex = 1) => {
  return `${STATIC_BASE_URL}/myauto/photos/${product.photo}/thumbs/${product.car_id}_${imageIndex}.jpg?v=${product.photo_ver}`;
};
