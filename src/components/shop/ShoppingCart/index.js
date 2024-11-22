import { Component, xml } from "@odoo/owl";
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
                    <h3>Shopping Cart (<t t-esc="props.items.length"/> items)</h3>
                    <button class="close-btn" t-on-click="props.onClose">
                        <i class="fa fa-times"></i>
                    </button>
                </div>

                <!-- Cart Items -->
                <div class="cart-items">
                    <t t-if="props.items.length === 0">
                        <div class="empty-cart">
                            <i class="fa fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                            <button class="shop-now-btn" t-on-click="goToShop">Shop Now</button>
                        </div>
                    </t>
                    <t t-else="">
                        <t t-foreach="props.items" t-as="item" t-key="item.id">
                            <div class="cart-item">
                                <!-- Product Image -->
                                <div class="item-image">
                                    <img t-att-src="item.image" t-att-alt="item.name"/>
                                </div>
                                
                                <!-- Product Info -->
                                <div class="item-info">
                                    <h4 class="item-name" t-esc="item.name"/>
                                    <div class="item-price" t-esc="formatPrice(item.price)"/>
                                    
                                    <!-- Quantity Controls -->
                                    <div class="quantity-controls">
                                        <button 
                                            class="qty-btn" 
                                            t-on-click="() => this.updateQuantity(item, item.quantity - 1)"
                                            t-att-disabled="isMinQuantity(item)">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                        <span class="quantity" t-esc="item.quantity"/>
                                        <button 
                                            class="qty-btn"
                                            t-on-click="() => this.updateQuantity(item, item.quantity + 1)"
                                            t-att-disabled="isMaxQuantity(item)">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Remove Button -->
                                <button 
                                    class="remove-btn"
                                    t-on-click="() => this.removeItem(item)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </t>
                    </t>
                </div>

                <!-- Cart Footer -->
                <div t-if="props.items.length > 0" class="cart-footer">
                    <div class="cart-summary">
                        <div class="subtotal">
                            <span>Subtotal:</span>
                            <span t-esc="formatPrice(getSubtotal())"/>
                        </div>
                        <p class="tax-note">Taxes and shipping calculated at checkout</p>
                    </div>
                    <button 
                        class="checkout-btn"
                        t-on-click="props.onCheckout">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    `;

    static props = {
        isOpen: { type: Boolean },
        items: { type: Array },
        onClose: { type: Function },
        onUpdateQuantity: { type: Function },
        onRemoveItem: { type: Function },
        onCheckout: { type: Function }
    };

    formatPrice(price) {
        return productHelpers.formatPrice(price);
    }

    getSubtotal() {
        return cartService.cart.total;
    }

    updateQuantity(item, newQuantity) {
        if (newQuantity >= 1) {
            cartService.updateQuantity(item.id, newQuantity);
        }
    }

    isMinQuantity(item) {
        return item.quantity <= 1;
    }

    isMaxQuantity(item) {
        return item.maxQuantity ? item.quantity >= item.maxQuantity : false;
    }

    removeItem(item) {
        cartService.removeItem(item.id);
    }

    getShippingCost() {
        const subtotal = this.getSubtotal();
        return subtotal > 100 ? 0 : 10; // Free shipping over $100
    }

    getTotal() {
        return this.getSubtotal() + this.getShippingCost();
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