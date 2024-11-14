// // // src/components/Root.js -------------------------------------------------------

import { Component, xml } from "@odoo/owl";
import "./style.scss";

class HomePage extends Component {
    static template = xml`
        <div class="home-page">
            <h1>Welcome to Odoo OWL</h1>
            <p>A modern frontend project template using Odoo OWL framework.</p>
        </div>
    `;
}

export default HomePage;  // Add default export