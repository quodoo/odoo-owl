import { Component, xml, onMounted, onWillUnmount, useState } from "@odoo/owl";
import { cartService } from "@services/shop/cartService";
import { toastService } from "@services/toastService";
import { productHelpers } from "@utils/helpers";
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
                    <span class="current-price" t-esc="formatPrice(props.product.price)"/>
                    <span t-if="props.product.list_price &amp;&amp; props.product.discount" class="old-price" t-esc="formatPrice(props.product.list_price)"/>
                </div>
            </div>
        </div>
    `;

    static props = {
        product: { type: Object },
        onQuickView: { type: Function, optional: true }
    };

    setup() {
        this.productHelpers = productHelpers;

        this.state = useState({
            isInWishlist: false,
            isAddingToCart: false
        });


        onMounted(() => {
            this.onCartUpdated = () => this.render();
            cartService.on("update", this.onCartUpdated);
        });

        onWillUnmount(() => {
            cartService.off("update", this.onCartUpdated);
        });
    }

    formatPrice(price) {
        return this.productHelpers.formatPrice(price);
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
