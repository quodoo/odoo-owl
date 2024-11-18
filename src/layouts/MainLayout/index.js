import { Component, xml } from "@odoo/owl";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import HomePage from "@pages/Home";
import AboutPage from "@pages/About";
import ContactPage from "@pages/Contact";
import { routeState } from "@services/router";
import "./style.scss";
import MainLayoutXml from "./MainLayout.xml";

class MainLayout extends Component {
    static template = xml`
        ${MainLayoutXml}
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