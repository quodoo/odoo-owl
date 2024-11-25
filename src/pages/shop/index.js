import { Component, xml, useState, onMounted } from "@odoo/owl";
import { ProductGrid } from "@components/shop/ProductGrid";
import { CategoryNav } from "@components/shop/CategoryNav";
import { FilterSidebar } from "@components/shop/FilterSidebar";
import { shopStore } from "@store/shop";
import LoadingIndicator from "@components/LoadingIndicator";
import { PRODUCTS } from "@data/products";
import { CATEGORIES } from "@data/categories";

import "./style.scss";

export default class ShopPage extends Component {
    static template = xml`
        <div class="shop-page">
            <div class="container">
                <!-- Categories Navigation -->
                <CategoryNav 
                    categories="state.categories"
                    selectedCategory="state.selectedCategory"
                    onCategoryChange="(cat) => this.onCategoryChange(cat)"
                />
                
                <div class="shop-content">
                    <!-- Left Sidebar -->
                    <aside class="shop-sidebar">
                        <FilterSidebar 
                            filters="state.filters"
                            selectedFilters="state.selectedFilters"
                            onFilterChange="(filters) => this.onFilterChange(filters)"
                            priceRange="state.priceRange"
                            onPriceRangeChange="(range) => this.onPriceRangeChange(range)"
                        />
                    </aside>

                    <div class="shop-main">
                        <!-- Shop Header -->
                        <div class="shop-header">
                            <div class="results-count">
                                <span t-esc="state.filteredProducts.length"/> Products Found
                            </div>
                            
                            <div class="shop-controls">
                                <div class="filter-section">
                                    <div class="sort-options">
                                        <select t-on-change="onSortChange" t-att-value="state.sortBy">
                                            <option value="featured">Featured</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="newest">Newest First</option>
                                            <option value="popularity">Most Popular</option>
                                            <option value="rating">Highest Rated</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="view-options">
                                    <button 
                                        t-att-class="{'active': state.viewMode === 'grid'}"
                                        t-on-click="() => this.setViewMode('grid')">
                                        <i class="fa fa-th-large"></i>
                                    </button>
                                    <button 
                                        t-att-class="{'active': state.viewMode === 'list'}"
                                        t-on-click="() => this.setViewMode('list')">
                                        <i class="fa fa-list"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Active Filters -->
                        <div t-if="hasActiveFilters" class="active-filters">
                            <div class="filter-tags">
                                <t t-foreach="getActiveFilters()" t-as="filter" t-key="filter.id">
                                    <span class="filter-tag">
                                        <t t-esc="filter.label"/>
                                        <button t-on-click="() => this.removeFilter(filter)">×</button>
                                    </span>
                                </t>
                            </div>
                            <button class="clear-filters" t-on-click="clearAllFilters">
                                Clear All
                            </button>
                        </div>

                        <!-- Loading State -->
                        <div t-if="state.loading" class="loading-state">
                            <LoadingIndicator />
                        </div>

                        <!-- Error State -->
                        <div t-elif="state.error" class="error-state">
                            <p>Error: <t t-esc="state.error"/></p>
                        </div>

                        <!-- Product Grid -->
                        <t t-else="">
                            <ProductGrid 
                                products="state.filteredProducts"
                                viewMode="state.viewMode"
                                onQuickView="(product) => this.showQuickView(product)"
                                onAddToCart="(product) => this.addToCart(product)"
                                onAddToWishlist="(product) => this.addToWishlist(product)"
                            />
                        </t>
                    </div>
                </div>
            </div>
        </div>
    `;

    static components = { 
        ProductGrid, 
        CategoryNav, 
        LoadingIndicator,
        FilterSidebar 
    };

    setup() {
        this.state = useState({
            loading: true,
            error: null,
            products: [],
            filteredProducts: [],
            categories: [
                { id: 'all', name: 'All Products', count: 0 }
            ],
            selectedCategories: [],
            viewMode: 'grid',
            sortBy: 'featured',
            filters: {
                brands: [],
                colors: [],
                sizes: [],
                ratings: [],
                availability: false
            },
            selectedFilters: {
                brands: [],
                colors: [],
                sizes: [],
                ratings: [],
                availability: false
            },
            priceRange: {
                min: 0,
                max: 1000,
                current: { min: 0, max: 1000 }
            }
        });

        this.initializeData();
        this.setupUrlListener();

        onMounted(() => {
            this.checkUrlParams();
        });

        // Thêm event listener cho categoryChanged
        window.addEventListener('categoryChanged', (event) => {
            const category = event.detail.category;
            if (category) {
                this.state.selectedCategories = [category];
                this.filterProducts();
            }
        });

        // Khởi tạo dữ liệu ngay lập tức
        this.initializeData();
        
        // Check URL params sau khi khởi tạo dữ liệu
        this.checkUrlParams();
    }

    setupUrlListener() {
        window.addEventListener('popstate', () => {
            this.checkUrlParams();
        });
    }

    initializeData() {
        this.state.products = PRODUCTS;
        
        this.state.categories = [
            { 
                id: 'all', 
                name: 'All Products', 
                count: PRODUCTS.length 
            },
            ...CATEGORIES.map(cat => ({
                id: cat.id,
                name: cat.name,
                count: PRODUCTS.filter(p => p.category === cat.id).length
            }))
        ];

        const brands = [...new Set(PRODUCTS.map(p => p.brand).filter(Boolean))];
        
        const colors = [...new Set(PRODUCTS.map(p => p.color).filter(Boolean))];
        
        const sizes = [...new Set(PRODUCTS.map(p => p.size).filter(Boolean))];

        const prices = PRODUCTS.map(p => p.price);
        this.state.priceRange = {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices)),
            current: {
                min: Math.floor(Math.min(...prices)),
                max: Math.ceil(Math.max(...prices))
            }
        };

        this.state.filters = {
            brands,
            colors,
            sizes,
            ratings: [5, 4, 3, 2, 1],
            availability: true
        };

        this.filterProducts();
        
        this.state.loading = false;
    }

    checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            this.state.selectedCategories = [categoryParam];
            this.filterProducts();
        }
    }

    onCategoryChange(category) {
        let newCategories = [...this.state.selectedCategories];
        const index = newCategories.indexOf(category);
        
        if (category === 'all') {
            newCategories = [];
        } else if (index === -1) {
            newCategories.push(category);
        } else {
            newCategories.splice(index, 1);
        }

        this.state.selectedCategories = newCategories;

        if (newCategories.length > 0) {
            const queryString = `categories=${newCategories.join(',')}`;
            history.pushState(null, '', `/shop?${queryString}`);
        } else {
            history.pushState(null, '', '/shop');
        }
        
        this.filterProducts();
    }

    // New methods for filter handling
    get hasActiveFilters() {
        const { selectedFilters, priceRange } = this.state;
        return Object.values(selectedFilters).some(f => 
            Array.isArray(f) ? f.length > 0 : f
        ) || 
        priceRange.current.min !== priceRange.min ||
        priceRange.current.max !== priceRange.max;
    }

    getActiveFilters() {
        const activeFilters = [];
        const { selectedFilters, priceRange } = this.state;

        // Add price range filter if modified
        if (priceRange.current.min !== priceRange.min || 
            priceRange.current.max !== priceRange.max) {
            activeFilters.push({
                id: 'price',
                label: `Price: $${priceRange.current.min} - $${priceRange.current.max}`
            });
        }

        // Add other active filters
        Object.entries(selectedFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    activeFilters.push({
                        id: `${key}-${v}`,
                        label: `${key}: ${v}`,
                        type: key,
                        value: v
                    });
                });
            } else if (value) {
                activeFilters.push({
                    id: key,
                    label: key,
                    type: key,
                    value: true
                });
            }
        });

        return activeFilters;
    }

    removeFilter(filter) {
        if (filter.id === 'price') {
            this.state.priceRange.current = {
                min: this.state.priceRange.min,
                max: this.state.priceRange.max
            };
        } else {
            const filters = { ...this.state.selectedFilters };
            if (Array.isArray(filters[filter.type])) {
                filters[filter.type] = filters[filter.type].filter(v => v !== filter.value);
            } else {
                filters[filter.type] = false;
            }
            this.state.selectedFilters = filters;
        }
        this.filterProducts();
    }

    clearAllFilters() {
        this.state.selectedFilters = {
            brands: [],
            colors: [],
            sizes: [],
            ratings: [],
            availability: false
        };
        this.state.priceRange.current = {
            min: this.state.priceRange.min,
            max: this.state.priceRange.max
        };
        this.filterProducts();
    }

    onSortChange(event) {
        this.state.sortBy = event.target.value;
        this.filterProducts();
    }

    setViewMode(mode) {
        this.state.viewMode = mode;
    }

    onFilterChange(filters) {
        this.state.selectedFilters = filters;
        this.filterProducts();
    }

    onPriceRangeChange(range) {
        this.state.priceRange.current = range;
        this.filterProducts();
    }

    filterProducts() {
        let filtered = [...this.state.products];
        const { selectedCategories, selectedFilters, priceRange } = this.state;
        
        // Category filter - hỗ trợ nhiều categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }

        // Price range filter
        filtered = filtered.filter(p => 
            p.price >= priceRange.current.min && 
            p.price <= priceRange.current.max
        );

        // Brand filter
        if (selectedFilters.brands.length) {
            filtered = filtered.filter(p => selectedFilters.brands.includes(p.brand));
        }

        // Color filter
        if (selectedFilters.colors.length) {
            filtered = filtered.filter(p => p.color && selectedFilters.colors.includes(p.color));
        }

        // Size filter
        if (selectedFilters.sizes.length) {
            filtered = filtered.filter(p => p.size && selectedFilters.sizes.includes(p.size));
        }

        // Rating filter
        if (selectedFilters.ratings.length) {
            filtered = filtered.filter(p => 
                selectedFilters.ratings.includes(Math.floor(p.rating))
            );
        }

        // Availability filter
        if (selectedFilters.availability) {
            filtered = filtered.filter(p => p.stock > 0);
        }

        // Apply sorting
        switch (this.state.sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'popularity':
                filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default: // 'featured'
                filtered.sort((a, b) => (b.isBestOffer ? 1 : 0) - (a.isBestOffer ? 1 : 0));
        }

        this.state.filteredProducts = filtered;

        // Cập nhật số lượng sản phẩm cho mỗi category
        this.updateCategoryCounts(filtered);
    }

    // Thêm phương thức để cập nhật số lượng sản phẩm cho mỗi category
    updateCategoryCounts(filteredProducts) {
        const categoryCounts = {};
        
        // Đếm số lượng sản phẩm cho mỗi category trong danh sách đã lọc
        filteredProducts.forEach(product => {
            categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
        });

        // Cập nhật count cho mỗi category
        this.state.categories = this.state.categories.map(cat => ({
            ...cat,
            count: cat.id === 'all' ? filteredProducts.length : (categoryCounts[cat.id] || 0)
        }));
    }

    showQuickView(product) {
        // Implementation will be added later
        console.log('showQuickView', product);
    }

    addToCart(product) {
        shopStore.addToCart(product);
    }

    addToWishlist(product) {
        shopStore.toggleWishlist(product);
    }
}