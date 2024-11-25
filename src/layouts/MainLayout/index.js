import { Component, xml } from "@odoo/owl";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import HomePage from "@pages/Home";
import AboutPage from "@pages/About";
import ShopPage from "@pages/shop";
import ProductListPage from "@pages/shop/ProductList";
import ProductDetailPage from "@src/components/shop/ProductDetail";
import Toast from "@components/Toast";
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
                    <t t-if="state.currentRoute === '/shop'">
                        <ShopPage />
                    </t>
                    <t t-if="state.currentRoute.startsWith('/shop/product/')">
                        <ProductDetailPage productId="getProductId()" />
                    </t>
                </main>
                <Footer />
            </div>
        </t>
    `;

    static components = { 
        Header, 
        Footer, 
        HomePage, 
        AboutPage, 
        ShopPage,
        ProductListPage,
        ProductDetailPage,
        Toast,
    };

    setup() {
        this.state = routeState;
        window.addEventListener("route-changed", () => this.render());
    }

    getProductId() {
        const match = this.state.currentRoute.match(/\/shop\/product\/(\d+)/);
        return match ? parseInt(match[1]) : null;
    }
};


export default MainLayout; 