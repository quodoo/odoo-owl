import { Component, xml } from "@odoo/owl";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import "./style.scss";

export default class App extends Component {
    static template = xml`
        <div class="app-container">
            <Header />
            <main class="main-content">
                <t t-slot="default"/>
            </main>
            <Footer />
        </div>
    `;

    static components = { Header, Footer };
} 