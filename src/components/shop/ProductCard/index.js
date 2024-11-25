import { Component, xml, useState } from "@odoo/owl";
// import { APP_SETTINGS } from "@config/settings";
// import { productHelpers } from "@utils/helpers";
import { cartService } from "@services/shop/cartService";
import { toastService } from "@services/toastService";
import "./style.scss";

export class ProductCard extends Component {
    static template = xml`
        <div class="product-card">
            <div class="product-image">
                <img t-att-src="getProductImage()" t-att-alt="props.product.name"/>
                <div class="product-actions">
                    <button class="action-btn quick-view" 
                            t-on-click="() => this.onQuickView(props.product)">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="action-btn add-to-cart" 
                            t-on-click="addToCart"
                            t-att-disabled="!props.product.inStock">
                        <i class="fa fa-shopping-cart"></i>
                    </button>
                    <button class="action-btn add-to-wishlist" 
                            t-on-click="toggleWishlist"
                            t-att-class="{ active: props.product.isInWishlist }">
                        <i class="fa fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name" t-esc="props.product.name"/>
                <div class="product-price">
                    <span class="current-price">$<t t-esc="props.product.price.toFixed(2)"/></span>
                    <span t-if="props.product.oldPrice" class="old-price">
                        $<t t-esc="props.product.oldPrice.toFixed(2)"/>
                    </span>
                </div>
            </div>
        </div>
    `;

    static props = {
        product: { type: Object },
        onQuickView: { type: Function, optional: true }
    };

    setup() {
        this.state = useState({
            isInWishlist: false,
            isAddingToCart: false
        });
    }

    getProductImage() {
        return this.props.product.thumbImage || 
               this.props.product.image || 
               '/assets/images/default-product.jpg';
    }

    addToCart(event) {
        event.preventDefault();
        event.stopPropagation();

        try {
            cartService.addItem(this.props.product);
            toastService.show(`Added ${this.props.product.name} to cart`, 'success');
        } catch (error) {
            console.error('Error adding to cart:', error);
            toastService.show('Failed to add to cart', 'error');
        }
    }

    toggleWishlist() {
        // Implement wishlist logic
    }

    onQuickView() {
        if (this.props.onQuickView) {
            this.props.onQuickView(this.props.product);
        }
    }
}