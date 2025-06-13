import defineStore from "recozy";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}

// 模拟API数据
const mockProducts: Product[] = [
  { id: 1, name: "iPhone", price: 999 },
  { id: 2, name: "MacBook", price: 1299 },
  { id: 3, name: "AirPods", price: 199 },
];

const useShoppingStore = defineStore({
  // 状态
  products: [] as Product[],
  cart: [] as CartItem[],
  selectedProduct: null as Product | null,
  isLoading: false,
  error: null as string | null,

  // 计算属性
  get cartTotal() {
    return this.cart.reduce((total: number, item: CartItem) => {
      const product = this.products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  },

  addToCart(productId: number) {
    const existingItem = this.cart.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ productId, quantity: 1 });
    }
    this.cart = [...this.cart];
  },

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.productId !== productId);
  },

  async fetchProducts() {
    this.isLoading = true;
    this.error = null;

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.products = mockProducts;
    } catch (error) {
      this.error = "Failed to fetch products";
      console.error("Error fetching products:", error);
    } finally {
      this.isLoading = false;
    }
  },
});

export default useShoppingStore;
