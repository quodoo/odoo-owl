import { Component, xml } from "@odoo/owl";
import "./style.scss";


export default class TermsPage extends Component {
    static template = xml`
        <div class="terms-of-service">
            <div class="container">
                <h1>Terms of Service</h1>
                <div class="content">
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.</p>
                    </section>

                    <section>
                        <h2>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Odoo OWL Project's website for personal, non-commercial transitory viewing only.</p>
                        <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                        <ul>
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose</li>
                            <li>Remove any copyright or other proprietary notations</li>
                            <li>Transfer the materials to another person</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Disclaimer</h2>
                        <p>The materials on Odoo OWL Project's website are provided on an 'as is' basis. Odoo OWL Project makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:</p>
                        <ul>
                            <li>Implied warranties of merchantability</li>
                            <li>Fitness for a particular purpose</li>
                            <li>Non-infringement of intellectual property</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Limitations</h2>
                        <p>In no event shall Odoo OWL Project be liable for any damages arising out of the use or inability to use the materials on the website.</p>
                    </section>

                    <section>
                        <h2>5. Revisions</h2>
                        <p>We may update these terms of service from time to time. Please check this page regularly for any updates.</p>
                    </section>
                </div>
            </div>
        </div>
    `;
}; 