import { Component, xml } from "@odoo/owl";

export class ProjectInfo extends Component {
    static template = xml`
        <div class="project-info">
            <h2>About The Project</h2>
            <p>This project demonstrates the power and flexibility of the Odoo OWL framework...</p>
            <div class="tech-stack">
                <h2>Technology Stack</h2>
                <ul>
                    <li>Odoo OWL Framework</li>
                    <li>Webpack 5</li>
                    <li>SASS/SCSS</li>
                    <li>Docker</li>
                    <li>Nginx</li>
                </ul>
            </div>
        </div>
    `;
} 