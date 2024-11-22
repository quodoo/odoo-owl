import { Component, xml } from "@odoo/owl";
import "./ShoppingCart.scss";

export class ShoppingCart extends Component {
    static template = xml`
        <div class="shopping-cart-drawer" t-att-class="{ active: props.isOpen }">
            <div class="drawer-overlay" t-on-click="props.onClose"/>
            <div class="drawer-content">
                <div class="drawer-header">
                    <h2>Shopping Cart</h2>
                    <button class="close-btn" t-on-click="props.onClose">
                        <i class="fa fa-times"></i>
                    </button>
                </div>

                <div class="cart-items">
                    <t t-if="props.items.length === 0">
                        <div class="empty-cart">
                            <i class="fa fa-shopping-cart fa-3x"></i>
                            <p>Your cart is empty</p>
                            <button class="continue-shopping" t-on-click="props.onClose">
                                Continue Shopping
                            </button>
                        </div>
                    </t>
                    
                    <t t-foreach="props.items" t-as="item" t-key="item.id">
                        <div class="cart-item">
                            <div class="item-image">
                                <img t-att-src="item.image" t-att-alt="item.name"/>
                            </div>
                            <div class="item-details">
                                <h3 class="item-name" t-esc="item.name"/>
                                <div class="item-price">
                                    $<t t-esc="(item.price * item.quantity).toFixed(2)"/>
                                </div>
                                <div class="quantity-controls">
                                    <button t-on-click="() => this.updateQuantity(item, -1)"
                                            t-att-disabled="item.quantity &lt;= 1">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                    <span t-esc="item.quantity"/>
                                    <button t-on-click="() => this.updateQuantity(item, 1)"
                                            t-att-disabled="item.quantity &gt;= item.maxQuantity">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="remove-item" 
                                    t-on-click="() => this.removeItem(item)">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </t>
                </div>

                <div t-if="props.items.length > 0" class="cart-footer">
                    <div class="cart-summary">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>$<t t-esc="getSubtotal().toFixed(2)"/></span>
                        </div>
                        <div class="summary-row">
                            <span>Shipping:</span>
                            <span>$<t t-esc="getShippingCost().toFixed(2)"/></span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>$<t t-esc="getTotal().toFixed(2)"/></span>
                        </div>
                    </div>
                    <button class="checkout-btn" t-on-click="onCheckout">
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

    updateQuantity(item, change) {
        if (this.props.onUpdateQuantity) {
            this.props.onUpdateQuantity(item, item.quantity + change);
        }
    }

    removeItem(item) {
        if (this.props.onRemoveItem) {
            this.props.onRemoveItem(item);
        }
    }

    getSubtotal() {
        return this.props.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
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
}
