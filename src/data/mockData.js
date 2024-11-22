import defaultProductThumb from "@assets/images/default-product-thumb.svg";

export const MOCK_DATA = {
    // Danh mục sản phẩm
    categories: [
        { id: 'all', name: 'All Products', url: '/shop' },
        { id: 'electronics', name: 'Electronics', url: '/shop/electronics' },
        { id: 'clothing', name: 'Clothing', url: '/shop/clothing' },
        { id: 'books', name: 'Books', url: '/shop/books' },
        { id: 'home', name: 'Home & Garden', url: '/shop/home' }
    ],

    // Sản phẩm
    products: [
        {
            id: 1,
            name: "Smartphone X",
            price: 699.99,
            image: defaultProductThumb,
            description: "Latest smartphone with advanced features",
            category: "electronics",
            stock: 50,
            rating: 4.5,
            specifications: {
                screen: "6.5 inch OLED",
                processor: "Snapdragon 888",
                ram: "8GB",
                storage: "128GB"
            }
        },
        {
            id: 2,
            name: "Classic T-Shirt",
            price: 24.99,
            image: defaultProductThumb,
            description: "Comfortable cotton t-shirt",
            category: "clothing",
            stock: 100,
            rating: 4.0,
            sizes: ["S", "M", "L", "XL"],
            colors: ["Black", "White", "Navy"]
        },
        {
            id: 3,
            name: "Programming Guide",
            price: 39.99,
            image: defaultProductThumb,
            description: "Comprehensive programming guide",
            category: "books",
            stock: 30,
            rating: 4.8,
            format: ["Hardcover", "Digital"]
        }
    ],

    // Người dùng
    users: [
        {
            id: 1,
            username: "john_doe",
            email: "john@example.com",
            role: "customer"
        }
    ],

    // Đơn hàng
    orders: [
        {
            id: 1,
            userId: 1,
            items: [
                { productId: 1, quantity: 1, price: 699.99 },
                { productId: 2, quantity: 2, price: 24.99 }
            ],
            total: 749.97,
            status: "pending",
            createdAt: "2024-03-10"
        }
    ],

    // Cấu hình hệ thống
    settings: {
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
            productThumb: defaultProductThumb,
            productLarge: defaultProductThumb,
            categoryThumb: defaultProductThumb,
        }
    },

    // Filters cho sản phẩm
    filters: {
        price: {
            ranges: [
                { id: 1, label: "Under $50", min: 0, max: 50 },
                { id: 2, label: "$50 - $100", min: 50, max: 100 },
                { id: 3, label: "$100 - $500", min: 100, max: 500 },
                { id: 4, label: "Over $500", min: 500, max: null }
            ]
        },
        ratings: [5, 4, 3, 2, 1],
        sortOptions: [
            { id: 'price_asc', label: 'Price: Low to High' },
            { id: 'price_desc', label: 'Price: High to Low' },
            { id: 'name_asc', label: 'Name: A to Z' },
            { id: 'name_desc', label: 'Name: Z to A' },
            { id: 'rating', label: 'Best Rating' }
        ]
    }
};

// Helper functions
export const getProductsByCategory = (categoryId) => {
    if (categoryId === 'all') return MOCK_DATA.products;
    return MOCK_DATA.products.filter(product => product.category === categoryId);
};

export const getProductById = (productId) => {
    return MOCK_DATA.products.find(product => product.id === productId);
};

export const getCategoryById = (categoryId) => {
    return MOCK_DATA.categories.find(category => category.id === categoryId);
};

export const formatPrice = (price) => {
    const { symbol, position } = MOCK_DATA.settings.currency;
    const formattedPrice = price.toFixed(2);
    return position === 'before' ? `${symbol}${formattedPrice}` : `${formattedPrice}${symbol}`;
}; 