import { Component, xml } from "@odoo/owl";
import { MOCK_DATA } from "@data/mockData";
import { productHelpers } from "@utils/helpers";
import "./style.scss";

export class CategorySection extends Component {
    static template = xml`
        <div class="category-section">
            <div class="category-grid">
                <t t-foreach="popularCategories" t-as="category" t-key="category.id">
                    <div class="category-card" t-on-click="() => this.navigateToCategory(category.id)">
                        <div class="category-icon">
                            <img 
                                t-att-src="category.icon" 
                                t-att-alt="category.name"
                                onError="this.onerror=null; this.src='https://via.placeholder.com/80?text=Category'"
                            />
                        </div>
                        <div class="category-image">
                            <img 
                                t-att-src="category.image" 
                                t-att-alt="category.name"
                                onError="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Category+Image'"
                            />
                        </div>
                        <div class="category-info">
                            <h3 class="category-name" t-esc="category.name"/>
                            <p class="category-count" t-esc="category.productCount + ' Products'"/>
                        </div>
                    </div>
                </t>
            </div>
        </div>
    `;

    setup() {
        this.popularCategories = productHelpers.getPopularCategories(MOCK_DATA.categories);
        console.log('Popular Categories:', this.popularCategories); // Debug log
    }

    navigateToCategory(categoryId) {
        // Handle navigation
        console.log('Navigate to category:', categoryId);
    }
}