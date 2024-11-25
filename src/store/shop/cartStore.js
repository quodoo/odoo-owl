import { reactive } from "@odoo/owl";

export const cartStore = reactive({
    items: [],
    isOpen: false,

    // Thêm sản phẩm vào giỏ hàng
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
    },

    // Cập nhật số lượng
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
            }
        }
    },

    // Xóa sản phẩm
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart() {
        this.items = [];
    },

    // Tính tổng tiền
    getSubtotal() {
        return this.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
    },

    // Tính phí ship
    getShippingCost() {
        const subtotal = this.getSubtotal();
        return subtotal > 100 ? 0 : 10; // Miễn phí ship cho đơn > $100
    },

    // Tính tổng đơn hàng
    getTotal() {
        return this.getSubtotal() + this.getShippingCost();
    },

    // Toggle giỏ hàng
    toggleCart() {
        this.isOpen = !this.isOpen;
    }
});
