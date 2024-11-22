import { reactive } from "@odoo/owl";

class CartService {
    constructor() {
        this.cart = reactive({
            items: [],
            total: 0
        });
    }

    addItem(product, quantity = 1) {
        const existingItem = this.cart.items.find(item => item.id === product.id);
        
        if (existingItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            existingItem.quantity += quantity;
        } else {
            // Nếu là sản phẩm mới, thêm vào giỏ hàng
            this.cart.items.push({
                ...product,
                quantity: quantity
            });
        }

        this.updateTotal();
        this.saveCart();
    }

    removeItem(productId) {
        this.cart.items = this.cart.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.updateTotal();
                this.saveCart();
            }
        }
    }

    clearCart() {
        this.cart.items = [];
        this.cart.total = 0;
        this.saveCart();
    }

    updateTotal() {
        this.cart.total = this.cart.items.reduce((sum, item) => {
            const price = item.price * (1 - (item.discount || 0) / 100);
            return sum + price * item.quantity;
        }, 0);
    }

    // Lưu giỏ hàng vào localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Khôi phục giỏ hàng từ localStorage
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            this.cart.items = parsedCart.items;
            this.cart.total = parsedCart.total;
        }
    }
}

export const cartService = new CartService();

// Khôi phục giỏ hàng khi khởi động ứng dụng
cartService.loadCart();
