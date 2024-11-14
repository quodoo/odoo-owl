// // // src/components/Root.js -------------------------------------------------------

import { Component, xml } from "@odoo/owl";
import "./style.scss";

class HomePage extends Component {
    static template = xml`
        <div class="home-page">
            <div class="hero-section">
                <h1 class="rainbow-text"><div class="rainbow-text-item">Welcome to Odoo OWL Project</div></h1>
                <p class="subtitle">A modern web application built with Odoo OWL Framework</p>
            </div>

            <div class="content-section">
                <div class="project-info">
                    <h2>About The Project</h2>
                    <p>This project demonstrates the power and flexibility of the Odoo OWL framework, 
                    combining modern web development practices with robust enterprise-level architecture.</p>
                    
                    <div class="tech-stack">
                        <h3>Technology Stack</h3>
                        <ul>
                            <li>Odoo OWL Framework</li>
                            <li>Webpack 5</li>
                            <li>SASS/SCSS</li>
                            <li>Docker</li>
                            <li>Nginx</li>
                        </ul>
                    </div>
                </div>

                <div class="documentation">
                    <h2>Documentation &amp; Resources</h2>
                    <ul>
                        <li>
                            <a href="https://github.com/odoo/owl" target="_blank">
                                OWL Framework Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://webpack.js.org/" target="_blank">
                                Webpack Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://eslint.org/" target="_blank">
                                ESLint Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://sass-lang.com/documentation" target="_blank">
                                SASS/SCSS Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.docker.com/" target="_blank">
                                Docker Documentation
                            </a>
                        </li>
                        <li>
                            <a href="https://nginx.org/en/docs/" target="_blank">
                                Nginx Documentation
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="contact-info">
                    <h2>Developer Contact</h2>
                    <div class="developer-details">
                        <p class="name">Trinh Van Quang</p>
                        <p class="location">Nam Tu Liem, Hanoi, Vietnam</p>
                        <p class="phone">
                            <a href="tel:+84972421977">+84 972 421 977</a>
                        </p>
                        <p class="email">
                            <a href="mailto:trinhvanquangf1@gmail.com">trinhvanquangf1@gmail.com</a>
                        </p>
                    </div>
                    <a href="/contact" class="contact-button">Get In Touch</a>
                </div>
            </div>
        </div>
    `;
}

export default HomePage;  // Add default export