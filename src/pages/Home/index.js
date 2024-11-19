import { Component, xml } from "@odoo/owl";
import "./style.scss";
import MarketChart from "../../components/MarketChart/MarketChart";

class HeroSection extends Component {}
HeroSection.template = xml`
    <div class="hero-section">
        <h1 class="rainbow-text">
            <div class="rainbow-text-item">
                Welcome to My Odoo OWL Project
            </div>
        </h1>
        <p class="subtitle">A modern web application built with Odoo OWL Framework</p>
    </div>
`;

class HomePage extends Component {
    static template = xml`
        <div class="home-page">
            <HeroSection/>
            <MarketChart/>
        </div>
    `;

    static components = {
        HeroSection,
        MarketChart,
    };
}

export default HomePage;