// import { APP_SETTINGS } from '@config/settings';
import { PRODUCTS } from './products';
import { CATEGORIES } from './categories';
import { BRANDS } from './brands';

export const MOCK_DATA = {
    // Hero Banner Data
    heroBanners: {
        main: {
            id: 1,
            title: "Apple Products",
            description: "Get 20% Off on all of the apple products.",
            image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200",
            buttonText: "Shop Now",
            buttonClass: "btn-shop"
        },
        side: [
            {
                id: 2,
                title: "Samsung Phone",
                description: "Hurry and get discounts.",
                image: "https://images.unsplash.com/photo-1603617984666-609070002691?q=80&w=1000",
                buttonText: "Add to Cart",
                buttonClass: "btn-cart"
            },
            {
                id: 3,
                title: "Smart Watch",
                description: "Making a difference every day",
                image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600",
                buttonText: "Buy Now",
                buttonClass: "btn-buy"
            }
        ]
    },
    brands: BRANDS,
    // Categories - 20 loại sản phẩm
    categories: CATEGORIES,
    products: PRODUCTS,

    // Best Offers Products
    
};