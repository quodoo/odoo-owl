import { API_URLS } from '../../config/urls';

class WishlistService {
  constructor() {
    this.wishlist = {
      items: []
    };
  }

  async toggleItem(product) {
    try {
      const exists = this.wishlist.items.find(item => item.id === product.id);
      if (exists) {
        // Remove from wishlist
        this.wishlist.items = this.wishlist.items.filter(item => item.id !== product.id);
        await fetch(API_URLS.WISHLIST.REMOVE, {
          method: 'POST',
          body: JSON.stringify({ productId: product.id })
        });
      } else {
        // Add to wishlist
        this.wishlist.items.push(product);
        await fetch(API_URLS.WISHLIST.ADD, {
          method: 'POST',
          body: JSON.stringify({ productId: product.id })
        });
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      throw error;
    }
  }
}

export const wishlistService = new WishlistService();
