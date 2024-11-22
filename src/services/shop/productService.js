import { reactive } from "@odoo/owl";

// Mock product data - replace with actual API calls later
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        description: "Premium cotton basic t-shirt",
        image: "/assets/products/tshirt-white.jpg",
        category: "clothing",
        inStock: true,
        rating: 4.5
    },
    // Add more mock products...
];

export class ProductService {
    constructor() {
        this.products = reactive({ items: [] });
    }

    async fetchProducts() {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        this.products.items = MOCK_PRODUCTS;
        return this.products.items;
    }

    async getProductById(id) {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_PRODUCTS.find(p => p.id === id);
    }

    async getProductsByCategory(category) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return MOCK_PRODUCTS.filter(p => p.category === category);
    }
}

export const productService = new ProductService();