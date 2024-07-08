export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
}
