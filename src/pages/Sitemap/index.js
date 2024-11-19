import { Component, xml } from "@odoo/owl";
import "./style.scss";

export default class SitemapPage extends Component {
    static template = xml`
        <div class="sitemap">
            <div class="container">
                <h1>Sitemap</h1>
                <div class="sitemap-content">
                    <section>
                        <h2>Main Navigation</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/docs">Documentation</a></li>
                            <li><a href="/components">Components</a></li>
                            <li><a href="/examples">Examples</a></li>
                            <li><a href="/blog">Blog</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2>Documentation</h2>
                        <ul>
                            <li><a href="/docs/getting-started">Getting Started</a></li>
                            <li><a href="/docs/installation">Installation</a></li>
                            <li><a href="/docs/components">Components Guide</a></li>
                            <li><a href="/docs/api">API Reference</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2>Resources</h2>
                        <ul>
                            <li><a href="/tutorials">Tutorials</a></li>
                            <li><a href="/community">Community</a></li>
                            <li><a href="/support">Support</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2>Legal</h2>
                        <ul>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    `;
};