import { Component, xml } from "@odoo/owl";
import "./LoadingIndicator.scss";

class LoadingIndicator extends Component {
    static template = xml`
        <div class="loading-pulse">
            <div class="pulse"></div>
        </div>
    `;
}

export default LoadingIndicator; 