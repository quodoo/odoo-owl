import { Component, xml, useState } from "@odoo/owl";
import { cartService } from "@services/shop/cartService";
import { wishlistService } from "@services/shop/wishlistService";
import { ShoppingCart } from "@components/shop/ShoppingCart";
import { WishList } from "@components/shop";
import { router, routeState } from "@services/router";
import logo from "@assets/images/logo.png";
import "./style.scss";
import { APP_URLS } from '../../config/urls';

export default class Header extends Component {
    static template = xml`
        <header class="main-header">
            <!-- Top Bar -->
            <div class="top-bar">
                <div class="container">
                    <div class="top-bar-content">
                        <div class="promo-text">
                            Big Deals | Get 50% Off | Code #GET50
                        </div>
                        <div class="currency-selector">
                            <select t-on-change="onCurrencyChange">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Header -->
            <div class="main-header-content">
                <div class="container">
                    <!-- Logo and Search -->
                    <div class="header-top">
                        <div class="logo">
                            <img t-att-src="state.logo" alt="Prime Logo"/>
                        </div>
                        
                        <div class="search-bar">
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                t-on-input="onSearchInput"
                                t-ref="searchInput"
                            />
                            <button class="search-btn">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>

                        <div class="header-actions">
                            <!-- My Cart -->
                            <div class="action-item cart" t-on-click="toggleCart">
                                <i class="fa fa-shopping-cart"></i>
                                <div class="action-details">
                                    <span class="label">My Cart</span>
                                    <span class="value" t-esc="formatPrice(cartTotal)"/>
                                </div>
                                <span t-if="cartCount" class="count" t-esc="cartCount"/>
                            </div>

                            <!-- Wishlist -->
                            <div class="action-item wishlist" t-on-click="toggleWishlist">
                                <i class="fa fa-heart"></i>
                                <div class="action-details">
                                    <span class="label">My Wishlist</span>
                                    <span class="value">View Wishlist</span>
                                </div>
                                <span t-if="wishlistCount" class="count" t-esc="wishlistCount"/>
                            </div>

                            <!-- Account -->
                            <div class="action-item account">
                                <i class="fa fa-user"></i>
                                <div class="action-details">
                                    <span class="label">Guest</span>
                                    <span class="value">My Account</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <nav class="main-nav">
                        <button class="categories-btn">
                            <i class="fa fa-bars"></i>
                            Categories
                        </button>
                        
                        <div class="nav-links">
                            <a t-att-class="{ active: state.currentRoute === '/' }"
                               href="/" t-on-click.prevent="() => this.navigate('/')">
                               Home
                            </a>
                            <a t-att-class="{ active: state.currentRoute.startsWith('/shop') }"
                               href="/shop" t-on-click.prevent="() => this.navigate('/shop')">
                               Shop
                            </a>
                            <a t-att-class="{ 'has-badge': true, active: state.currentRoute === '/popular' }"
                               href="/popular" t-on-click.prevent="() => this.navigate('/popular')">
                               Popular
                               <span class="badge">New</span>
                            </a>
                            <a t-att-class="{ active: state.currentRoute === '/trending' }"
                               href="/trending" t-on-click.prevent="() => this.navigate('/trending')">
                               Trending
                            </a>
                            <a href="/brands">Brands</a>
                            <a t-att-class="{ 'has-badge': true }" href="/collection">
                                Collection
                                <span class="badge green">Hot</span>
                            </a>
                            <a href="/contact">Contact us</a>
                            <a href="/deals">Top Deals</a>
                        </div>
                    </nav>
                </div>
            </div>

            <!-- Shopping Cart Drawer -->
            <ShoppingCart 
                isOpen="state.isCartOpen"
                items="cartService.cart.items"
                onClose="() => this.toggleCart()"
                onUpdateQuantity="(item, qty) => this.updateCartQuantity(item, qty)"
                onRemoveItem="(item) => this.removeFromCart(item)"
                onCheckout="() => this.onCheckout()"
            />

            <!-- Wishlist Drawer -->
            <WishList t-props="wishlistProps"/>
        </header>
    `;

    static components = { ShoppingCart, WishList };

    setup() {
        this.state = useState({
            ...routeState,
            logo: logo,
            isCartOpen: false,
            isWishlistOpen: false,
            currency: 'USD'
        });

        this.cartService = cartService;
        this.wishlistService = wishlistService;

        // Listen for route changes
        window.addEventListener("route-changed", () => {
            this.render();
        });
    }

    get cartCount() {
        return cartService.cart.items.reduce(
            (sum, item) => sum + item.quantity, 0
        );
    }

    get cartTotal() {
        return cartService.cart.total;
    }

    get wishlistCount() {
        return this.wishlistService.wishlist.items.length;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.state.currency
        }).format(price);
    }

    onCurrencyChange(event) {
        this.state.currency = event.target.value;
    }

    onSearchInput(event) {
        // Implement search functionality
        console.log('Search:', event.target.value);
    }

    get wishlistProps() {
        return {
            isOpen: this.state.isWishlistOpen,
            items: this.wishlistService.wishlist.items,
            onClose: () => this.toggleWishlist(),
            onAddToCart: (item) => this.addToCart(item),
            onRemoveItem: (item) => this.removeFromWishlist(item),
            onAddAllToCart: (items) => this.addAllToCart(items)
        };
    }

    navigate(route) {
        router.navigate(route);
    }

    toggleCart() {
        this.state.isCartOpen = !this.state.isCartOpen;
        if (this.state.isCartOpen) {
            this.state.isWishlistOpen = false;
        }
        this.render();
    }

    toggleWishlist() {
        this.state.isWishlistOpen = !this.state.isWishlistOpen;
        if (this.state.isWishlistOpen) {
            this.state.isCartOpen = false;
        }
        this.render();
    }

    updateCartQuantity(item, quantity) {
        this.cartService.updateQuantity(item.id, quantity);
    }

    removeFromCart(item) {
        this.cartService.removeItem(item.id);
    }

    removeFromWishlist(item) {
        this.wishlistService.toggleItem(item);
    }

    addToCart(item) {
        this.cartService.addItem(item);
    }

    addAllToCart(items) {
        items.forEach(item => this.cartService.addItem(item));
        this.state.isWishlistOpen = false;
        this.state.isCartOpen = true;
    }

    onCheckout() {
        this.state.isCartOpen = false;
        this.render();
        router.navigate(APP_URLS.CART);
    }
}
