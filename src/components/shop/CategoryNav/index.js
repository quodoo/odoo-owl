import { Component, xml } from "@odoo/owl";
import { MOCK_DATA } from "@data/mockData";
import "./style.scss";

export class CategoryNav extends Component {
    static template = xml`
        <div class="category-nav">
            <div class="container">
                <ul class="category-list">
                    <t t-if="state.categories">
                        <t t-foreach="state.categories" t-as="category" t-key="category.id">
                            <li class="category-item">
                                <a t-att-href="category.url" 
                                   t-att-class="{ active: category.id === state.activeCategory }"
                                   t-on-click.prevent="() => this.selectCategory(category.id)">
                                    <t t-esc="category.name"/>
                                </a>
                            </li>
                        </t>
                    </t>
                </ul>
            </div>
        </div>
    `;

    static props = {
        onCategoryChange: { type: Function, optional: true }
    };

    setup() {
        this.state = {
            categories: MOCK_DATA.categories,
            activeCategory: 'all'
        };
    }

    selectCategory(categoryId) {
        this.state.activeCategory = categoryId;
        if (this.props.onCategoryChange) {
            this.props.onCategoryChange(categoryId);
        }
    }
} 