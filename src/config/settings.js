export const APP_SETTINGS = {
    currency: {
        symbol: "$",
        code: "USD",
        position: "before"
    },
    pagination: {
        itemsPerPage: 12,
        maxPagesShow: 5
    },
    imageSettings: {
        thumbnailSize: {
            width: 200,
            height: 200
        },
        productSize: {
            width: 600,
            height: 600
        }
    },
    defaultImages: {
        productThumb: 'https://via.placeholder.com/400x300?text=No+Image',
        productLarge: 'https://via.placeholder.com/800x600?text=No+Image',
        categoryThumb: 'https://via.placeholder.com/400x300?text=No+Category',
        brandLogo: 'https://via.placeholder.com/200x100?text=No+Logo'
    }
};

// Format helpers
export const formatHelpers = {
    formatPrice: (price) => {
        const { symbol, position } = APP_SETTINGS.currency;
        const formattedPrice = price.toFixed(2);
        return position === 'before' ? `${symbol}${formattedPrice}` : `${formattedPrice}${symbol}`;
    },
    
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// API endpoints
export const API_ENDPOINTS = {
    products: '/api/products',
    categories: '/api/categories',
    brands: '/api/brands',
    cart: '/api/cart',
    wishlist: '/api/wishlist'
};

// Route paths
export const ROUTES = {
    home: '/',
    shop: '/shop',
    product: '/product/:id',
    category: '/category/:id',
    brand: '/brand/:id',
    cart: '/cart',
    wishlist: '/wishlist'
}; 