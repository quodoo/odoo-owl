import { Component, xml } from "@odoo/owl";
import { BRANDS } from "@data/brands"; // Import BRANDS from brands.js
import { productHelpers } from "@utils/helpers";
import "./style.scss";

export class BrandSection extends Component {
    static template = xml`
        <div class="brand-section">
            <div class="brand-grid">
                <t t-foreach="topBrands" t-as="brand" t-key="brand.id">
                    <div class="brand-card">
                        <div class="brand-logo">
                            <img 
                                t-att-src="brand.logo" 
                                t-att-alt="brand.name"
                                src="brand.logo"
                            />
                        </div>
                        <div class="brand-info">
                            <h3 class="brand-name" t-esc="brand.name"/>
                            <p class="product-count" t-esc="brand.productCount + ' Products'"/>
                        </div>
                    </div>
                </t>
            </div>
        </div>
    `;

    setup() {
        this.topBrands = productHelpers.getTopBrands(BRANDS); // Use BRANDS instead of MOCK_DATA.brands
    }

}