import { reactive } from "@odoo/owl";
import { productService } from "@services/shop/productService";
import { cartService } from "@services/shop/cartService";
import { wishlistService } from "@services/shop/wishlistService";

export const shopStore = reactive({
    products: [],
    categories: [],
    loading: false,
    error: null,

    async loadInitialData() {
        try {
            this.loading = true;
            this.error = null;
            
            const products = await productService.fetchProducts();
            this.products = products;
            
            // Extract unique categories
            this.categories = [...new Set(products.map(p => p.category))];
        } catch (err) {
            this.error = err.message;
        } finally {
            this.loading = false;
        }
    },

    // Cart actions
    addToCart(product, quantity = 1) {
        cartService.addItem(product, quantity);
    },

    // Wishlist actions
    toggleWishlist(product) {
        wishlistService.toggleItem(product);
    }
});
