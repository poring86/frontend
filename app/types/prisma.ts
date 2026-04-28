export enum ConsumptionMethod {
  DINE_IN = "DINE_IN",
  TAKEAWAY = "TAKEAWAY",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  restaurantId: string;
  menuCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuCategory {
  id: string;
  name: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatarImageUrl: string;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  menuCategories: MenuCategory[];
}
