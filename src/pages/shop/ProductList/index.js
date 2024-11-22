import { Component, xml } from "@odoo/owl";
import { getProductsByCategory, MOCK_DATA } from "@data/mockData";
import { CategoryNav } from "@components/shop/CategoryNav";
import { ProductCard } from "@components/shop/ProductCard";
import "./style.scss";

export default class ProductList extends Component {
    static template = xml`
        <div class="shop-product-list">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <CategoryNav 
                            onCategoryChange="(category) => this.onCategoryChange(category)"
                        />
                    </div>
                </div>
                
                <div class="product-grid">
                    <t t-if="state.products and state.products.length">
                        <t t-foreach="state.products" t-as="product" t-key="product.id">
                            <ProductCard product="product"/>
                        </t>
                    </t>
                    <t t-else="">
                        <div class="no-products">
                            <p>No products found</p>
                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;

    static components = { CategoryNav, ProductCard };

    setup() {
        this.state = {
            products: getProductsByCategory('all'),
            selectedCategory: 'all',
            categories: MOCK_DATA.categories
        };
        console.log('Initial products:', this.state.products); // Debug log
    }

    onCategoryChange(categoryId) {
        console.log('Category changed to:', categoryId); // Debug log
        this.state.selectedCategory = categoryId;
        this.state.products = getProductsByCategory(categoryId);
        console.log('Updated products:', this.state.products); // Debug log
        this.render();
    }
}
