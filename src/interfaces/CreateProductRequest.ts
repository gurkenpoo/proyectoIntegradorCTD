export interface CreateProductRequest {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
}
