import { Component, xml } from "@odoo/owl";
import "./style.scss";
import { ProjectInfo, Documentation, ContactInfo } from "@components/Footer";

class Footer extends Component {
    static template = xml`
        <footer class="main-footer">
            <div class="footer-container">
                <div class="footer-content">
                    <div class="footer-section">
                        <ProjectInfo/>
                    </div>
                    <div class="footer-section">
                        <Documentation/>
                    </div>
                    <div class="footer-section">
                        <ContactInfo/>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <div class="footer-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/sitemap">Sitemap</a>
                    </div>
                    <div class="footer-copyright">
                        <p>© 2024 Odoo OWL Project. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    `;

    static components = {
        ProjectInfo,
        Documentation,
        ContactInfo
    };
}

export default Footer; 