import { Component, xml } from "@odoo/owl";
import { MOCK_DATA } from "@data/mockData";
import "./style.scss";

export class HeroBanner extends Component {
    static template = xml`
        <div class="hero-banner">
            <div class="banner-grid">
                <!-- Main Banner -->
                <div class="main-banner">
                    <div class="banner-content">
                        <h1 t-esc="mainBanner.title"/>
                        <p t-esc="mainBanner.description"/>
                        <button t-att-class="mainBanner.buttonClass" t-esc="mainBanner.buttonText"/>
                    </div>
                    <div class="banner-image">
                        <img 
                            t-att-src="mainBanner.image"
                            t-att-alt="mainBanner.title"
                            onError="this.onerror=null; this.src='https://via.placeholder.com/800x600?text=Banner+Image'"
                        />
                    </div>
                </div>

                <!-- Side Banners -->
                <t t-foreach="sideBanners" t-as="banner" t-key="banner.id">
                    <div class="side-banner">
                        <div class="banner-content">
                            <h2 t-esc="banner.title"/>
                            <p t-esc="banner.description"/>
                            <button t-att-class="banner.buttonClass" t-esc="banner.buttonText"/>
                        </div>
                        <div class="banner-image">
                            <img 
                                t-att-src="banner.image"
                                t-att-alt="banner.title"
                                onError="this.onerror=null; this.src='https://via.placeholder.com/400x300?text=Banner+Image'"
                            />
                        </div>
                    </div>
                </t>
            </div>
        </div>
    `;

    setup() {
        this.mainBanner = MOCK_DATA.heroBanners.main;
        this.sideBanners = MOCK_DATA.heroBanners.side;
        console.log('Main Banner:', this.mainBanner); // Debug log
        console.log('Side Banners:', this.sideBanners); // Debug log
    }
} 