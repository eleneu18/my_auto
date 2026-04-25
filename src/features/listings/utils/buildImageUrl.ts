import type { Product } from "../types";

export const buildImageUrl = (product: Product, imageIndex = 1) => {
  return `https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_${imageIndex}.jpg?v=${product.photo_ver}`;
};