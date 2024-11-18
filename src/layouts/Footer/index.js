import { Component, xml } from "@odoo/owl";
import "./style.scss";

import FooterXml from "./Footer.xml";

class Footer extends Component {
    static template = xml`
        ${FooterXml}
    `;
}

export default Footer; 