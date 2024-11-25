import { Component, xml, onMounted, onWillUnmount } from "@odoo/owl";
import { cartService } from "@services/shop/cartService";
import { productHelpers } from "@utils/helpers";
import "./style.scss";

export class ShoppingCart extends Component {
    static template = xml`
        <div class="cart-drawer" t-att-class="{ 'open': props.isOpen }">
            <div class="cart-overlay" t-on-click="props.onClose"/>
            
            <div class="cart-content">
                <!-- Header -->
                <div class="cart-header">
                    <h3>Shopping Cart (<t t-esc="cartService.cart.items.length"/> items)</h3>
                    <button class="close-btn" t-on-click="props.onClose">
                        <i class="fa fa-times"></i>
                    </button>
                </div>

                <!-- Cart Items -->
                <div class="cart-items">
                    <t t-if="cartService.cart.items.length === 0">
                        <div class="empty-cart">
                            <i class="fa fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <button class="shop-now-btn" t-on-click="goToShop">Shop Now</button>
                        </div>
                    </t>
                    <t t-else="">
                        <t t-foreach="cartService.cart.items" t-as="item" t-key="item.id">
                            <div class="cart-item">
                                <div class="item-image">
                                    <img t-att-src="item.image" t-att-alt="item.name"/>
                                </div>
                                <div class="item-info">
                                    <h4 class="item-name" t-esc="item.name"/>
                                    <div class="item-price" t-esc="formatPrice(item.price)"/>
                                    <div class="quantity-controls">
                                        <button 
                                            class="qty-btn" 
                                            t-on-click="() => this.updateQuantity(item, item.quantity - 1)"
                                            t-att-disabled="item.quantity &lt;= 1">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                        <span class="quantity" t-esc="item.quantity"/>
                                        <button 
                                            class="qty-btn"
                                            t-on-click="() => this.updateQuantity(item, item.quantity + 1)">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    class="remove-btn"
                                    t-on-click="() => this.removeFromCart(item)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </t>
                    </t>
                </div>

                <!-- Cart Footer -->
                <div t-if="cartService.cart.items.length > 0" class="cart-footer">
                    <div class="cart-summary">
                        <div class="subtotal">
                            <span>Subtotal:</span>
                            <span t-esc="formatPrice(cartService.cart.total)"/>
                        </div>
                        <p class="tax-note">Taxes and shipping calculated at checkout</p>
                    </div>
                    <button 
                        class="checkout-btn"
                        t-on-click="onCheckout">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    `;

    setup() {
        this.cartService = cartService;
        this.productHelpers = productHelpers;

        onMounted(() => {
            this.render(); // Initial render
            this.cartService.on('update', this.render.bind(this)); // Re-render on cart update
        });

        onWillUnmount(() => {
            this.cartService.off('update', this.render.bind(this));
        });

    }

    formatPrice(price) {
        return this.productHelpers.formatPrice(price);
    }

    updateQuantity(item, newQuantity) {
        if (newQuantity >= 1) {
            this.cartService.updateQuantity(item.id, newQuantity);
        }
    }

    removeFromCart(item) {
        this.cartService.removeItem(item.id);
    }

    onCheckout() {
        if (this.props.onCheckout) {
            this.props.onCheckout();
        }
    }

    goToShop() {
        this.props.onClose();
        window.location.href = '/shop';
    }
}
