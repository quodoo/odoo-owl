import { Component, xml } from "@odoo/owl";
import { ProductCard } from "../ProductCard";
import "./style.scss";

export class ProductGrid extends Component {
    static template = xml`
        <div class="product-grid">
            <div class="grid-controls" t-if="props.showControls">
                <div class="view-options">
                    <button class="view-btn" 
                            t-att-class="{ active: state.viewMode === 'grid' }"
                            t-on-click="() => this.setViewMode('grid')">
                        <i class="fa fa-th-large"></i>
                    </button>
                    <button class="view-btn"
                            t-att-class="{ active: state.viewMode === 'list' }"
                            t-on-click="() => this.setViewMode('list')">
                        <i class="fa fa-list"></i>
                    </button>
                </div>
                <div class="sort-options">
                    <select t-on-change="onSortChange">
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest First</option>
                    </select>
                </div>
            </div>

            <div t-attf-class="products-container {{ state.viewMode }}">
                <t t-foreach="props.products" t-as="product" t-key="product.id">
                    <ProductCard 
                        product="product"
                        onQuickView="(product) => this.onQuickView(product)"
                        onAddToCart="(product) => this.onAddToCart(product)"
                        onToggleWishlist="(product) => this.onToggleWishlist(product)"
                    />
                </t>
            </div>

            <div t-if="props.products.length === 0" class="no-products">
                <i class="fa fa-search fa-3x"></i>
                <p>No products found</p>
            </div>
        </div>
    `;

    static components = { ProductCard };

    static props = {
        products: { type: Array },
        showControls: { type: Boolean, optional: true },
        onQuickView: { type: Function, optional: true },
        onAddToCart: { type: Function, optional: true },
        onToggleWishlist: { type: Function, optional: true },
        onSortChange: { type: Function, optional: true }
    };

    setup() {
        this.state = {
            viewMode: 'grid' // or 'list'
        };
    }

    setViewMode(mode) {
        this.state.viewMode = mode;
    }

    onQuickView(product) {
        if (this.props.onQuickView) {
            this.props.onQuickView(product);
        }
    }

    onAddToCart(product) {
        if (this.props.onAddToCart) {
            this.props.onAddToCart(product);
        }
    }

    onToggleWishlist(product) {
        if (this.props.onToggleWishlist) {
            this.props.onToggleWishlist(product);
        }
    }

    onSortChange(event) {
        if (this.props.onSortChange) {
            this.props.onSortChange(event.target.value);
        }
    }
}
