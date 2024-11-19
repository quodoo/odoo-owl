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
import MainLayoutXml from "./MainLayout.xml";

class MainLayout extends Component {
    static template = xml`
        ${MainLayoutXml}
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