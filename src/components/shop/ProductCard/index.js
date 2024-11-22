import { Component, xml, useState } from "@odoo/owl";
import { APP_SETTINGS } from "@config/settings";
import { productHelpers } from "@utils/helpers";
import "./style.scss";
import { cartService } from "@services/shop/cartService";

export class ProductCard extends Component {
    static template = xml`
        <div class="product-card">
            <!-- Badges -->
            <div class="product-badges">
                <span t-if="props.product.discount" class="badge discount">
                    -<t t-esc="props.product.discount"/>%
                </span>
                <span t-if="isNew()" class="badge new">New</span>
            </div>

            <!-- Product Image -->
            <div class="product-image">
                <img t-att-src="getProductImage()" 
                     t-att-alt="props.product.name"
                     onError="this.onerror=null; this.src='${APP_SETTINGS.defaultImages.productThumb}'"/>
                
                <!-- Quick Actions -->
                <div class="product-actions">
                    <button 
                        class="action-btn quick-view"
                        t-on-click="() => this.props.onQuickView(props.product)"
                        title="Quick View">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button 
                        class="action-btn add-to-wishlist"
                        t-on-click="toggleWishlist"
                        t-att-class="{ 'active': state.isInWishlist }"
                        title="Add to Wishlist">
                        <i t-att-class="state.isInWishlist ? 'fa fa-heart' : 'fa fa-heart-o'"></i>
                    </button>
                </div>
            </div>

            <!-- Product Info -->
            <div class="product-info" t-on-click="() => this.props.onProductClick(props.product)">
                <!-- Brand -->
                <div class="product-brand" t-if="props.product.brand">
                    <span t-esc="props.product.brand"/>
                </div>

                <!-- Name -->
                <h3 class="product-name">
                    <span t-esc="props.product.name"/>
                </h3>

                <!-- Rating -->
                <div class="product-rating" t-if="props.product.rating">
                    <div class="stars">
                        <t t-foreach="[1,2,3,4,5]" t-as="star" t-key="star">
                            <i t-att-class="getStarClass(star, props.product.rating)"/>
                        </t>
                    </div>
                    <span class="rating-count">(<t t-esc="props.product.rating"/>)</span>
                </div>

                <!-- Price -->
                <div class="product-price">
                    <t t-if="props.product.discount">
                        <span class="original-price" t-esc="formatPrice(props.product.price * (1 + props.product.discount/100))"/>
                    </t>
                    <span class="current-price" t-esc="formatPrice(props.product.price)"/>
                </div>

                <!-- Stock Status -->
                <div class="stock-status" t-if="props.product.stock !== undefined">
                    <t t-if="props.product.stock > 0">
                        <span class="in-stock">
                            <i class="fa fa-check"></i> In Stock
                        </span>
                    </t>
                    <t t-else="">
                        <span class="out-of-stock">
                            <i class="fa fa-times"></i> Out of Stock
                        </span>
                    </t>
                </div>

                <!-- Add to Cart Button -->
                <button 
                    class="add-to-cart-btn"
                    t-on-click.stop="addToCart"
                    t-att-disabled="!props.product.stock">
                    <i class="fa fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;

    static props = {
        product: { type: Object },
        onProductClick: { type: Function },
        onQuickView: { type: Function },
        onAddToCart: { type: Function },
        onAddToWishlist: { type: Function }
    };

    setup() {
        this.state = useState({
            isInWishlist: false
        });
    }

    formatPrice(price) {
        return productHelpers.formatPrice(price);
    }

    getProductImage() {
        return this.props.product.thumbImage || 
               this.props.product.image || 
               APP_SETTINGS.defaultImages.productThumb;
    }

    getStarClass(star, rating) {
        return star <= rating ? 'fa fa-star' : 'fa fa-star-o';
    }

    isNew() {
        // Add your logic to determine if product is new
        return true; // For demo purposes
    }

    toggleWishlist(event) {
        event.stopPropagation();
        this.state.isInWishlist = !this.state.isInWishlist;
        this.props.onAddToWishlist(this.props.product);
    }

    addToCart(event) {
        event.stopPropagation();
        if (this.props.product.stock) {
            cartService.addItem(this.props.product);
            this.showSuccessMessage();
        }
    }

    showSuccessMessage() {
        console.log('Product added to cart successfully');
    }
} 