import { Component, xml } from "@odoo/owl";
import "./WishList.scss";

export class WishList extends Component {
    static template = xml`
        <div class="wishlist-drawer" t-att-class="{ active: props.isOpen }">
            <div class="drawer-overlay" t-on-click="props.onClose"/>
            <div class="drawer-content">
                <div class="drawer-header">
                    <h2>My Wishlist</h2>
                    <button class="close-btn" t-on-click="props.onClose">
                        <i class="fa fa-times"></i>
                    </button>
                </div>

                <div class="wishlist-items">
                    <t t-if="props.items.length === 0">
                        <div class="empty-wishlist">
                            <i class="fa fa-heart fa-3x"></i>
                            <p>Your wishlist is empty</p>
                            <button class="continue-shopping" t-on-click="props.onClose">
                                Continue Shopping
                            </button>
                        </div>
                    </t>
                    
                    <t t-foreach="props.items" t-as="item" t-key="item.id">
                        <div class="wishlist-item">
                            <div class="item-image">
                                <img t-att-src="item.image" t-att-alt="item.name"/>
                            </div>
                            <div class="item-details">
                                <h3 class="item-name" t-esc="item.name"/>
                                <div class="item-price">
                                    $<t t-esc="item.price.toFixed(2)"/>
                                </div>
                                <div class="item-status" t-if="item.inStock">
                                    <span class="in-stock">In Stock</span>
                                </div>
                                <div class="item-status" t-else="">
                                    <span class="out-of-stock">Out of Stock</span>
                                </div>
                            </div>
                            <div class="item-actions">
                                <button class="add-to-cart" 
                                        t-on-click="() => this.addToCart(item)"
                                        t-att-disabled="!item.inStock">
                                    <i class="fa fa-shopping-cart"></i>
                                </button>
                                <button class="remove-item" 
                                        t-on-click="() => this.removeItem(item)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </t>
                </div>

                <div t-if="props.items.length > 0" class="wishlist-footer">
                    <button class="add-all-to-cart" 
                            t-on-click="addAllToCart"
                            t-att-disabled="!hasInStockItems">
                        Add All Available Items to Cart
                    </button>
                </div>
            </div>
        </div>
    `;

    static props = {
        isOpen: { type: Boolean },
        items: { type: Array },
        onClose: { type: Function },
        onAddToCart: { type: Function },
        onRemoveItem: { type: Function },
        onAddAllToCart: { type: Function }
    };

    get hasInStockItems() {
        return this.props.items.some(item => item.inStock);
    }

    addToCart(item) {
        if (this.props.onAddToCart) {
            this.props.onAddToCart(item);
        }
    }

    removeItem(item) {
        if (this.props.onRemoveItem) {
            this.props.onRemoveItem(item);
        }
    }

    addAllToCart() {
        if (this.props.onAddAllToCart) {
            const inStockItems = this.props.items.filter(item => item.inStock);
            this.props.onAddAllToCart(inStockItems);
        }
    }
}
