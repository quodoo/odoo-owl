import { Component, xml } from "@odoo/owl";
import { MOCK_DATA } from "@data/mockData";
import { productHelpers } from "@utils/helpers";
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
                    <t t-if="state.products.length">
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
            products: productHelpers.getProductsByCategory(MOCK_DATA.products, 'all'),
            selectedCategory: 'all',
            categories: MOCK_DATA.categories
        };
    }

    onCategoryChange(categoryId) {
        this.state.selectedCategory = categoryId;
        this.state.products = productHelpers.getProductsByCategory(MOCK_DATA.products, categoryId);
        this.render();
    }
}
