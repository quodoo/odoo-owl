import { reactive } from "@odoo/owl";
import { toastService } from "@services/toastService";

const CART_STORAGE_KEY = 'shopping_cart';

class CartService {
    constructor() {
        this.cart = reactive({
            items: [],
            total: 0,
            isOpen: false,
            isProcessing: false
        });
        this.initializeCart();
    }

    initializeCart() {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                this.cart.items = parsedCart.items || [];
                this.cart.total = parsedCart.total || 0;
                console.log('Cart initialized from localStorage:', this.cart);
            }
        } catch (error) {
            console.error('Error initializing cart:', error);
            this.resetCart();
        }
    }

    async addItem(product, quantity = 1) {
        if (this.cart.isProcessing) {
            return;
        }

        try {
            this.cart.isProcessing = true;

            if (!product || !product.id) {
                throw new Error('Invalid product data');
            }

            const currentItems = [...this.cart.items];
            const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

            if (existingItemIndex !== -1) {
                currentItems[existingItemIndex] = {
                    ...currentItems[existingItemIndex],
                    quantity: currentItems[existingItemIndex].quantity + quantity
                };
            } else {
                currentItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                    stock: product.stock,
                    discount: product.discount
                });
            }

            this.cart.items = currentItems;

            await this.updateTotal();
            await this.persistCart();

            toastService.show(`${product.name} added to cart`, 'success');
            console.log('Cart updated:', this.cart);

        } catch (error) {
            console.error('Error adding item to cart:', error);
            toastService.show('Failed to add item to cart', 'error');
            throw error;
        } finally {
            this.cart.isProcessing = false;
        }
    }

    removeItem(productId) {
        try {
            const itemToRemove = this.cart.items.find(item => item.id === productId);
            if (itemToRemove) {
                this.cart.items = this.cart.items.filter(item => item.id !== productId);
                this.updateTotal();
                this.persistCart();
                toastService.show(`${itemToRemove.name} removed from cart`, 'info');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            toastService.show('Failed to remove item', 'error');
        }
    }

    updateQuantity(productId, quantity) {
        try {
            if (quantity <= 0) {
                this.removeItem(productId);
                return;
            }

            const updatedItems = this.cart.items.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );

            this.cart.items = updatedItems;
            this.updateTotal();
            this.persistCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
            toastService.show('Failed to update quantity', 'error');
        }
    }

    updateTotal() {
        this.cart.total = this.cart.items.reduce((sum, item) => {
            const price = item.price * (1 - (item.discount || 0) / 100);
            return sum + (price * item.quantity);
        }, 0);
    }

    async persistCart() {
        try {
            const cartData = {
                items: this.cart.items,
                total: this.cart.total
            };
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
            console.log('Cart saved to localStorage:', cartData);
        } catch (error) {
            console.error('Error saving cart:', error);
            toastService.show('Error saving cart data', 'error');
            throw error;
        }
    }

    resetCart() {
        this.cart.items = [];
        this.cart.total = 0;
        localStorage.removeItem(CART_STORAGE_KEY);
    }

    clearCart() {
        this.resetCart();
        toastService.show('Cart cleared', 'info');
    }

    getCartItemCount() {
        return this.cart.items.reduce((total, item) => total + item.quantity, 0);
    }

    toggleCart() {
        this.cart.isOpen = !this.cart.isOpen;
    }
}

export const cartService = new CartService();
console.log('CartService initialized with state:', cartService.cart);
