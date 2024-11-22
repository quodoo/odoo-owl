export const productHelpers = {
    getPopularCategories(categories) {
        return categories.filter(category => category.isPopular);
    },

    getBestOffers(products) {
        return products.filter(product => product.isBestOffer);
    },

    getTopBrands(brands) {
        return brands.filter(brand => brand.isTop);
    },

    getProductsByCategory(products, categoryId) {
        return products.filter(product => product.category === categoryId);
    },

    getProductsByBrand(products, brandId) {
        return products.filter(product => product.brand.toLowerCase() === brandId.toLowerCase());
    },

    getProductById(products, productId) {
        return products.find(product => product.id === productId);
    },

    formatPrice(price, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(price);
    }
};

export const categoryHelpers = {
    getCategoryById(categories, categoryId) {
        return categories.find(category => category.id === categoryId);
    },

    getCategoryPath(categories, categoryId) {
        const category = this.getCategoryById(categories, categoryId);
        return category ? `/shop/${category.id}` : '/shop';
    }
};

export const brandHelpers = {
    getBrandById(brands, brandId) {
        return brands.find(brand => brand.id === brandId);
    },

    getBrandPath(brands, brandId) {
        const brand = this.getBrandById(brands, brandId);
        return brand ? `/brands/${brand.id}` : '/brands';
    }
}; 