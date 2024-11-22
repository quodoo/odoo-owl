import { Component, xml } from "@odoo/owl";
import { productHelpers } from "@utils/helpers";
import "./style.scss";

export default class ProductDetail extends Component {
    static template = xml`
        <div class="product-detail-modal" t-if="props.product">
            <div class="modal-overlay" t-on-click="closeModal"/>
            <div class="modal-content">
                <!-- Close Button -->
                <button class="close-btn" t-on-click="closeModal">
                    <i class="fa fa-times"></i>
                </button>

                <div class="product-content">
                    <!-- Product Images -->
                    <div class="product-images">
                        <div class="main-image">
                            <img t-att-src="props.product.image" t-att-alt="props.product.name"/>
                        </div>
                        <div t-if="props.product.thumbImage" class="thumbnail-images">
                            <img t-att-src="props.product.thumbImage" t-att-alt="props.product.name"/>
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="product-info">
                        <div class="brand" t-if="props.product.brand">
                            <span t-esc="props.product.brand"/>
                        </div>

                        <h1 class="product-name" t-esc="props.product.name"/>

                        <!-- Rating -->
                        <div class="product-rating" t-if="props.product.rating">
                            <div class="stars">
                                <t t-foreach="[1,2,3,4,5]" t-as="star" t-key="star">
                                    <i t-att-class="getStarClass(star, props.product.rating)"/>
                                </t>
                            </div>
                            <span class="rating-value">(<t t-esc="props.product.rating"/>)</span>
                        </div>

                        <!-- Price -->
                        <div class="product-price">
                            <t t-if="props.product.discount">
                                <span class="original-price" t-esc="formatPrice(props.product.price * (1 + props.product.discount/100))"/>
                                <span class="discount-badge">-<t t-esc="props.product.discount"/>%</span>
                            </t>
                            <span class="current-price" t-esc="formatPrice(props.product.price)"/>
                        </div>

                        <!-- Stock Status -->
                        <div class="stock-status" t-if="props.product.stock !== undefined">
                            <t t-if="props.product.stock > 0">
                                <span class="in-stock">
                                    <i class="fa fa-check"></i> In Stock (<t t-esc="props.product.stock"/> available)
                                </span>
                            </t>
                            <t t-else="">
                                <span class="out-of-stock">
                                    <i class="fa fa-times"></i> Out of Stock
                                </span>
                            </t>
                        </div>

                        <!-- Description -->
                        <div class="product-description" t-if="props.product.description">
                            <p t-esc="props.product.description"/>
                        </div>

                        <!-- Specifications -->
                        <div class="product-specs" t-if="props.product.specifications">
                            <h3>Specifications</h3>
                            <div class="specs-grid">
                                <t t-foreach="Object.entries(props.product.specifications)" t-as="spec" t-key="spec[0]">
                                    <div class="spec-item">
                                        <span class="spec-label" t-esc="formatSpecLabel(spec[0])"/>
                                        <span class="spec-value" t-esc="spec[1]"/>
                                    </div>
                                </t>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button t-on-click="decrementQuantity">-</button>
                                <input type="number" t-model="state.quantity" min="1"/>
                                <button t-on-click="incrementQuantity">+</button>
                            </div>
                            <button 
                                class="add-to-cart-btn" 
                                t-on-click="addToCart"
                                t-att-disabled="!props.product.stock">
                                <i class="fa fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                            <button 
                                class="wishlist-btn"
                                t-on-click="toggleWishlist">
                                <i t-att-class="state.isInWishlist ? 'fa fa-heart' : 'fa fa-heart'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    static props = {
        product: { type: Object, optional: true },
        onClose: { type: Function },
    };

    setup() {
        this.state = {
            quantity: 1,
            isInWishlist: false
        };
    }

    formatPrice(price) {
        return productHelpers.formatPrice(price);
    }

    getStarClass(star, rating) {
        return star <= rating ? 'fa fa-star' : 'fa fa-star';
    }

    formatSpecLabel(label) {
        return label.split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    closeModal() {
        this.props.onClose();
    }

    incrementQuantity() {
        this.state.quantity++;
    }

    decrementQuantity() {
        if (this.state.quantity > 1) {
            this.state.quantity--;
        }
    }

    addToCart() {
        // Implement add to cart logic
        console.log('Adding to cart:', this.props.product, 'Quantity:', this.state.quantity);
    }

    toggleWishlist() {
        this.state.isInWishlist = !this.state.isInWishlist;
        // Implement wishlist logic
    }
}
