export const API_URLS = {
  // API endpoints
  CART: {
    ADD: '/api/cart/add',
    REMOVE: '/api/cart/remove',
    UPDATE: '/api/cart/update',
    GET: '/api/cart',
  },
  WISHLIST: {
    ADD: '/api/wishlist/add',
    REMOVE: '/api/wishlist/remove', 
    GET: '/api/wishlist',
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: '/api/products/:id',
    SEARCH: '/api/products/search',
  },
  USER: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/user/profile',
  }
};

export const APP_URLS = {
  // Frontend routes
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: '/product/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
}; 