import { Component, xml } from '@odoo/owl';
import './style.scss';

class Footer extends Component {
    static template = xml`
        <footer class="main-footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-copyright">
                        © 2024 Odoo OWL Project. All rights reserved.
                    </div>
                    <div class="footer-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

export default Footer; 