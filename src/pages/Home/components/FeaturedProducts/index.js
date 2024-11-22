import { Component, xml } from "@odoo/owl";
import { ProductCard } from "@components/shop/ProductCard";
import { MOCK_DATA } from "@data/mockData";
import "./style.scss";

export class FeaturedProducts extends Component {
    static template = xml`
        <div class="featured-products">
            <div class="products-grid">
                <t t-foreach="featuredProducts" t-as="product" t-key="product.id">
                    <ProductCard product="product"/>
                </t>
            </div>
            <div class="view-all">
                <button class="btn-view-all" t-on-click="viewAllProducts">View All Products</button>
            </div>
        </div>
    `;

    static components = { ProductCard };

    setup() {
        this.featuredProducts = MOCK_DATA.products.slice(0, 4); // Get first 4 products
    }

    viewAllProducts() {
        // Handle navigation to all products
        console.log('Navigate to all products');
    }
} 