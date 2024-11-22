import { Component, xml } from "@odoo/owl";
import { HeroBanner } from "./components/HeroBanner";
import { CategorySection } from "./components/CategorySection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { BrandSection } from "./components/BrandSection";
import "./style.scss";

export default class HomePage extends Component {
    static template = xml`
        <div class="home-page">
            <!-- Hero Banner Section -->
            <HeroBanner />
            
            <!-- Popular Categories -->
            <section class="popular-categories">
                <div class="container">
                    <h2 class="section-title">Popular Categories</h2>
                    <p class="section-subtitle">We add new products every day. Explore our great range of products.</p>
                    <CategorySection />
                </div>
            </section>

            <!-- Best Offers -->
            <section class="best-offers">
                <div class="container">
                    <h2 class="section-title">Best Offers For You</h2>
                    <p class="section-subtitle">Hurry and get huge discounts.</p>
                    <div class="offers-grid">
                        <FeaturedProducts />
                    </div>
                </div>
            </section>

            <!-- Brands Section -->
            <section class="brands-section">
                <div class="container">
                    <h2 class="section-title">Top Brands</h2>
                    <BrandSection />
                </div>
            </section>
        </div>
    `;

    static components = { 
        HeroBanner,
        CategorySection,
        FeaturedProducts,
        BrandSection
    };
}