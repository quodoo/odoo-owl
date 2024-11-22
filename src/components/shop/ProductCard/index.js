import { Component, xml } from "@odoo/owl";
import { formatPrice, MOCK_DATA } from "@data/mockData";
import "./style.scss";

export class ProductCard extends Component {
    static template = xml`
        <div class="product-card">
            <div class="product-image">
                <img t-att-src="getProductImage()" 
                     t-att-alt="props.product.name"
                     onError="this.onerror=null; this.src='${MOCK_DATA.settings.defaultImages.productThumb}'"/>
                <div class="product-actions">
                    <button class="btn-wishlist" t-on-click.prevent="toggleWishlist">
                        <i class="fa fa-heart"/>
                    </button>
                    <button class="btn-cart" t-on-click.prevent="addToCart">
                        <i class="fa fa-shopping-cart"/>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name" t-esc="props.product.name"/>
                <div class="product-price" t-esc="formatPrice(props.product.price)"/>
                <div class="product-description" t-esc="props.product.description"/>
            </div>
        </div>
    `;

    static props = {
        product: { type: Object }
    };

    setup() {
        this.formatPrice = formatPrice;
    }

    getProductImage() {
        return this.props.product.thumbImage || 
               this.props.product.image || 
               MOCK_DATA.settings.defaultImages.productThumb;
    }

    toggleWishlist() {
        console.log('Toggle wishlist for product:', this.props.product.id);
    }

    addToCart() {
        console.log('Add to cart:', this.props.product.id);
    }
} 