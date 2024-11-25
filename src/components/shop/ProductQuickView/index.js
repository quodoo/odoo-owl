import { Component, xml } from "@odoo/owl";
import "./style.scss";

export class ProductQuickView extends Component {
    static template = xml`
        <div class="quick-view-modal" t-att-class="{ active: props.isOpen }">
            <div class="modal-overlay" t-on-click="onClose"/>
            <div class="modal-content">
                <button class="close-btn" t-on-click="onClose">
                    <i class="fa fa-times"></i>
                </button>
                
                <t t-if="props.product">
                    <div class="product-quick-view">
                        <div class="product-image">
                            <img t-att-src="props.product.image" t-att-alt="props.product.name"/>
                        </div>
                        
                        <div class="product-info">
                            <h2 class="product-name" t-esc="props.product.name"/>
                            
                            <div class="product-price">
                                <span class="current-price">$<t t-esc="props.product.price.toFixed(2)"/></span>
                                <span t-if="props.product.oldPrice" class="old-price">
                                    $<t t-esc="props.product.oldPrice.toFixed(2)"/>
                                </span>
                            </div>
                            
                            <div class="product-status">
                                <span t-attf-class="badge {{ props.product.inStock ? 'in-stock' : 'out-of-stock' }}">
                                    <t t-esc="props.product.inStock ? 'In Stock' : 'Out of Stock'"/>
                                </span>
                            </div>
                            
                            <p class="product-description" t-esc="props.product.description"/>
                            
                            <div class="product-actions">
                                <div class="quantity-selector">
                                    <button t-on-click="decrementQuantity" 
                                            t-att-disabled="state.quantity &lt;= 1">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                    <input type="number" 
                                           t-model="state.quantity" 
                                           min="1" 
                                           t-att-max="props.product.maxQuantity"/>
                                    <button t-on-click="incrementQuantity"
                                            t-att-disabled="state.quantity >= props.product.maxQuantity">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                
                                <div class="action-buttons">
                                    <button class="add-to-cart" 
                                            t-on-click="onAddToCart"
                                            t-att-disabled="!props.product.inStock">
                                        <i class="fa fa-shopping-cart"></i>
                                        Add to Cart
                                    </button>
                                    <button class="add-to-wishlist" 
                                            t-on-click="onAddToWishlist"
                                            t-attf-class="{{ props.product.isInWishlist ? 'active' : '' }}">
                                        <i class="fa fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </t>
            </div>
        </div>
    `;

    static props = {
        isOpen: { type: Boolean },
        product: { type: Object, optional: true },
        onClose: { type: Function },
        onAddToCart: { type: Function, optional: true },
        onAddToWishlist: { type: Function, optional: true }
    };

    setup() {
        this.state = {
            quantity: 1
        };
    }

    incrementQuantity() {
        if (this.state.quantity < this.props.product.maxQuantity) {
            this.state.quantity++;
        }
    }

    decrementQuantity() {
        if (this.state.quantity > 1) {
            this.state.quantity--;
        }
    }

    onAddToCart() {
        if (this.props.onAddToCart) {
            this.props.onAddToCart(this.props.product, this.state.quantity);
        }
    }

    onAddToWishlist() {
        if (this.props.onAddToWishlist) {
            this.props.onAddToWishlist(this.props.product);
        }
    }
}
