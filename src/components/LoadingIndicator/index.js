import { Component, xml } from "@odoo/owl";
import "./style.scss";

export default class LoadingIndicator extends Component {
    static template = xml`
        <div class="loading-indicator">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
            <p t-if="props.message" class="loading-message">
                <t t-esc="props.message"/>
            </p>
        </div>
    `;

    static props = {
        message: { type: String, optional: true }
    };
}