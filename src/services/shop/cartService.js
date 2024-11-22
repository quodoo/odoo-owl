import { API_URLS } from '../../config/urls';

class CartService {
  constructor() {
    this.cart = {
      items: []
    };
  }

  async addItem(product) {
    try {
      const response = await fetch(API_URLS.CART.ADD, {
        method: 'POST',
        body: JSON.stringify(product)
      });
      const result = await response.json();
      // Update local cart state
      this.cart.items.push({...product, quantity: 1});
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  updateQuantity(productId, quantity) {
    // Update cart logic
    const item = this.cart.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  removeItem(productId) {
    // Remove item logic
    this.cart.items = this.cart.items.filter(item => item.id !== productId);
  }
}

export const cartService = new CartService();
