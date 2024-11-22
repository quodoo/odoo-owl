import { Component, xml} from "@odoo/owl";
import { cartService } from "@services/shop/cartService";
import { wishlistService } from "@services/shop/wishlistService";
import { ShoppingCart, WishList } from "@components/shop";
import { router, routeState } from "@services/router";
import logo from "@assets/images/logo.png";
import "./style.scss";
import { APP_URLS } from '../../config/urls';

export default class Header extends Component {
    static template = xml`
        <header class="main-header">
            <div class="container">
                <div class="header-content">
                    <div class="logo">
                        <t t-if="state.logo">
                            <img t-att-src="state.logo" alt="Logo" class="navbar-logo me-2"/>
                        </t>
                        <t t-if="!state.logo">
                            <div class="rainbow-text"><div class="rainbow-text-item">Odoo OWL</div></div>
                        </t>
                    </div>

                    <nav class="main-nav">
                        <a class="nav-link" t-att-class="{ active: state.currentRoute === '/' }"
                           href="/" t-on-click.prevent="() => this.navigate('/')">Home</a>
                        <a class="nav-link" t-att-class="{ active: state.currentRoute.startsWith('/shop') }"
                           href="/shop" t-on-click.prevent="() => this.navigate('/shop')">Shop</a>
                        <a class="nav-link" t-att-class="{ active: state.currentRoute === '/about' }"
                           href="/about" t-on-click.prevent="() => this.navigate('/about')">About</a>
                        <a class="nav-link" t-att-class="{ active: state.currentRoute === '/contact' }"
                           href="/contact" t-on-click.prevent="() => this.navigate('/contact')">Contact</a>
                    </nav>

                    <div class="header-actions">
                        <button class="action-btn wishlist-btn" 
                                t-on-click="toggleWishlist"
                                t-att-class="{ 'has-items': wishlistCount > 0 }">
                            <i class="fa fa-heart"></i>
                            <span t-if="wishlistCount" class="count" t-esc="wishlistCount"/>
                        </button>
                        <button class="action-btn cart-btn" 
                                t-on-click="toggleCart"
                                t-att-class="{ 'has-items': cartCount > 0 }">
                            <i class="fa fa-shopping-cart"></i>
                            <span t-if="cartCount" class="count" t-esc="cartCount"/>
                        </button>
                    </div>
                </div>
            </div>

            <ShoppingCart t-props="cartProps"/>
            <WishList t-props="wishlistProps"/>
        </header>
    `;

    static components = { ShoppingCart, WishList };

    setup() {
        this.state = {
            ...routeState,
            logo: logo
        };

        this.cartService = cartService;
        this.wishlistService = wishlistService;

        // Listen for route changes
        window.addEventListener("route-changed", () => this.render());
    }

    get cartCount() {
        return this.cartService.cart.items.reduce(
            (sum, item) => sum + item.quantity, 0
        );
    }

    get wishlistCount() {
        return this.wishlistService.wishlist.items.length;
    }

    get cartProps() {
        return {
            isOpen: this.state.isCartOpen,
            items: this.cartService.cart.items,
            onClose: () => this.toggleCart(),
            onUpdateQuantity: (item, qty) => this.updateCartQuantity(item, qty),
            onRemoveItem: (item) => this.removeFromCart(item),
            onCheckout: () => this.onCheckout()
        };
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
    }

    toggleWishlist() {
        this.state.isWishlistOpen = !this.state.isWishlistOpen;
        if (this.state.isWishlistOpen) {
            this.state.isCartOpen = false;
        }
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
        this.env.router.navigate('/cart');
    }

    navigateToCart() {
        this.router.navigate(APP_URLS.CART);
    }

    navigateToWishlist() {
        this.router.navigate(APP_URLS.WISHLIST);
    }
}
