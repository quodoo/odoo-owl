import { Component, xml } from "@odoo/owl";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import HomePage from "@pages/Home";
import AboutPage from "@pages/About";
import ContactPage from "@pages/Contact";
import MarketTrendsPage from "@pages/MarketTrends";
import PrivacyPage from "@pages/Privacy";
import TermsPage from "@pages/Terms";
import SitemapPage from "@pages/Sitemap";
import { routeState } from "@services/router";
import "./style.scss";

class MainLayout extends Component {
    static template = xml`
        <t t-name="main_layout">
            <div class="main-layout">
                <Header />
                <main class="main-content">
                    <t t-if="state.currentRoute === '/'">
                        <HomePage />
                    </t>
                    <t t-if="state.currentRoute === '/about'">
                        <AboutPage />
                    </t>
                    <t t-if="state.currentRoute === '/contact'">
                        <ContactPage />
                    </t>
                    <t t-if="state.currentRoute === '/market-trends'">
                        <MarketTrendsPage />
                    </t>
                    <t t-if="state.currentRoute === '/privacy'">
                        <PrivacyPage />
                    </t>
                    <t t-if="state.currentRoute === '/terms'">
                        <TermsPage />
                    </t>
                    <t t-if="state.currentRoute === '/sitemap'">
                        <SitemapPage />
                    </t>
                </main>
                <Footer />
            </div>
        </t>
    `;

    static components = { Header, Footer, HomePage, AboutPage, ContactPage, MarketTrendsPage, PrivacyPage, TermsPage, SitemapPage };

    setup() {
        this.state = routeState;
        
        // Listen for route changes
        window.addEventListener("route-changed", () => {
            this.render();
        });
    }
}

export default MainLayout; 