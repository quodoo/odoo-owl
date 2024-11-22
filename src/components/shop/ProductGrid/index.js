import { Component, xml, useState } from "@odoo/owl";
import { productHelpers } from "@utils/helpers";
import "./style.scss";
import ProductDetail from "@components/shop/ProductDetail";


export class ProductGrid extends Component {
    static template = xml`
        <div class="product-grid" t-att-class="props.viewMode">
            <div class="products-container" t-att-class="props.viewMode">
                <t t-foreach="props.products" t-as="product" t-key="product.id">
                    <div class="product-card" t-on-click="() => this.showProductDetail(product)">
                        <!-- Badges -->
                        <div class="product-badges">
                            <span t-if="product.discount" class="badge discount">
                                -<t t-esc="product.discount"/>%
                            </span>
                            <span t-if="isNew(product)" class="badge new">New</span>
                        </div>

                        <!-- Product Image -->
                        <div class="product-image">
                            <img t-att-src="product.image" t-att-alt="product.name"/>
                            
                            <!-- Quick Actions -->
                            <div class="product-actions">
                                <button 
                                    class="action-btn quick-view"
                                    t-on-click="() => this.props.onQuickView(product)"
                                    title="Quick View">
                                    <i class="fa fa-eye"></i>
                                </button>
                                <button 
                                    class="action-btn add-to-wishlist"
                                    t-on-click="() => this.props.onAddToWishlist(product)"
                                    title="Add to Wishlist">
                                    <i class="fa fa-heart"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Product Info -->
                        <div class="product-info">
                            <!-- Brand -->
                            <div class="product-brand" t-if="product.brand">
                                <span t-esc="product.brand"/>
                            </div>

                            <!-- Name -->
                            <h3 class="product-name">
                                <a href="#" t-esc="product.name"/>
                            </h3>

                            <!-- Rating -->
                            <div class="product-rating" t-if="product.rating">
                                <div class="stars">
                                    <t t-foreach="[1,2,3,4,5]" t-as="star" t-key="star">
                                        <i t-att-class="getStarClass(star, product.rating)"/>
                                    </t>
                                </div>
                                <span class="rating-count">(<t t-esc="product.rating"/>)</span>
                            </div>

                            <!-- Price -->
                            <div class="product-price">
                                <t t-if="product.discount">
                                    <span class="original-price" t-esc="formatPrice(product.price * (1 + product.discount/100))"/>
                                </t>
                                <span class="current-price" t-esc="formatPrice(product.price)"/>
                            </div>

                            <!-- Stock Status -->
                            <div class="stock-status" t-if="product.stock !== undefined">
                                <t t-if="product.stock > 0">
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
                                t-on-click="() => this.props.onAddToCart(product)"
                                t-att-disabled="!product.stock">
                                <i class="fa fa-shopping-cart"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </t>
            </div>
        </div>
        <ProductDetail 
            t-if="state.selectedProduct"
            product="state.selectedProduct"
            onClose="() => this.closeProductDetail()"
        />
    `;

    static props = {
        products: Array,
        viewMode: String,
        onQuickView: Function,
        onAddToCart: Function,
        onAddToWishlist: Function
    };

    static components = {
        ProductDetail
    };

    setup() {
        this.state = useState({
            selectedProduct: null
        });
    }

    formatPrice(price) {
        return productHelpers.formatPrice(price);
    }

    isNew(product) {
        console.log(product);
        // Consider product as new if it's less than 30 days old
        // You might want to adjust this logic based on your needs
        return true; // For demo purposes
    }

    getStarClass(star, rating) {
        return star <= rating ? 'fa fa-star' : 'far fa-star';
    }

    showProductDetail(product) {
        this.state.selectedProduct = product;
    }

    closeProductDetail() {
        this.state.selectedProduct = null;
    }
}
