import { Component, xml } from "@odoo/owl";

export class Documentation extends Component {
    static template = xml`
        <div class="documentation">
            <h2>Documentation &amp; Resources</h2>
            <ul>
                <li><a href="https://github.com/odoo/owl">OWL Framework</a></li>
                <li><a href="https://webpack.js.org/">Webpack</a></li>
                <li><a href="https://eslint.org/">ESLint</a></li>
                <li><a href="https://sass-lang.com/">SASS/SCSS</a></li>
                <li><a href="https://docs.docker.com/">Docker</a></li>
                <li><a href="https://nginx.org/">Nginx</a></li>
            </ul>
        </div>
    `;
} 