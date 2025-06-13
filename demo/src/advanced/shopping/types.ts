export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}
