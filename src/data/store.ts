import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import laptopBagImg from "@/assets/laptop-bag.jpg";
import officeChairImg from "@/assets/office-chair.jpg";
import ssdImg from "@/assets/ssd.jpg";
import sunglassesImg from "@/assets/sunglasses.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.",
    price: 299.99,
    category: "Electronics",
    stock: 50,
    imageUrl: headphonesImg,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Stay connected and track your fitness with the Smart Watch Pro. Features heart rate monitoring, GPS tracking, water resistance, and a stunning AMOLED display.",
    price: 449.99,
    category: "Electronics",
    stock: 35,
    imageUrl: smartwatchImg,
  },
  {
    id: "3",
    name: "Leather Laptop Bag",
    description: "Carry your essentials in style with our genuine leather laptop bag. Fits up to 15-inch laptops with dedicated pockets for accessories and documents.",
    price: 189.99,
    category: "Accessories",
    stock: 75,
    imageUrl: laptopBagImg,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Work comfortably all day with our ergonomic office chair. Features adjustable lumbar support, breathable mesh back, and customizable armrests.",
    price: 549.99,
    category: "Furniture",
    stock: 20,
    imageUrl: officeChairImg,
  },
  {
    id: "5",
    name: "Portable SSD 1TB",
    description: "Lightning-fast portable storage with USB-C connectivity. Transfer files at speeds up to 1050MB/s with military-grade encryption for data security.",
    price: 129.99,
    category: "Electronics",
    stock: 100,
    imageUrl: ssdImg,
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    description: "Make a statement with our designer sunglasses. UV400 protection, polarized lenses, and a timeless design that complements any outfit.",
    price: 249.99,
    category: "Accessories",
    stock: 45,
    imageUrl: sunglassesImg,
  },
];

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

// Store state management using localStorage
export const getProducts = (): Product[] => {
  const stored = localStorage.getItem("store_products");
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem("store_products", JSON.stringify(products));
  return products;
};

export const saveProducts = (updatedProducts: Product[]) => {
  localStorage.setItem("store_products", JSON.stringify(updatedProducts));
};

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem("store_orders");
  return stored ? JSON.parse(stored) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem("store_orders", JSON.stringify(orders));
};
