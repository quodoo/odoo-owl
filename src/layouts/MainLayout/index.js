import { Component, xml } from "@odoo/owl";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import HomePage from "@pages/Home";
import AboutPage from "@pages/About";
import ContactPage from "@pages/Contact";
import { routeState } from "@services/router";
import "./style.scss";

class MainLayout extends Component {
    static template = xml`
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
            </main>
            <Footer />
        </div>
    `;

    static components = { Header, Footer, HomePage, AboutPage, ContactPage };

    setup() {
        this.state = routeState;
        
        // Listen for route changes
        window.addEventListener("route-changed", () => {
            this.render();
        });
    }
}

export default MainLayout; 