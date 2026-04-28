export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  avatarImageUrl: string;
  coverImageUrl: string;
  menuCategories?: MenuCategory[];
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuCategory {
  id: string;
  name: string;
  restaurantId: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  restaurantId: string;
  menuCategoryId: string;
  restaurant: Restaurant;
  menuCategory: MenuCategory;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = "PENDING",
  IN_PREPARATION = "IN_PREPARATION",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  FINISHED = "FINISHED",
}

export enum ConsumptionMethod {
  TAKEAWAY = "TAKEAWAY",
  DINE_IN = "DINE_IN",
}

export interface OrderProduct {
  id: string;
  productId: string;
  product: Product;
  orderId: number;
  order: Order;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  total: number;
  status: OrderStatus;
  consumptionMethod: ConsumptionMethod;
  restaurantId: string;
  restaurant: Restaurant;
  customerName: string;
  customerCpf: string;
  orderProducts: OrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
