import { Component, xml } from "@odoo/owl";
import { router, routeState } from "@services/router";
import logo from "@assets/images/logo.png";


import "./style.scss";

class Header extends Component {
    static template = xml`
        <header class="main-header">
            <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
                <div class="container">
                    <a class="navbar-brand d-flex align-items-center" href="/" t-on-click="() => this.navigate('/')">
                        <t t-if="state.logo">
                            <img t-att-src="state.logo" alt="Logo" class="navbar-logo me-2"/>
                        </t>
                        <t t-if="!state.logo">
                            <div class="rainbow-text"><div class="rainbow-text-item">Odoo OWL</div></div>
                        </t>
                    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav" aria-controls="navbarNav" 
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link" t-att-class="{ active: state.currentRoute === '/' }"
                                   href="/" t-on-click="() => this.navigate('/')">
                                   Home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" t-att-class="{ active: state.currentRoute === '/market-trends' }"
                                   href="/market-trends" t-on-click="() => this.navigate('/market-trends')">
                                   Crypto Market Trends
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" t-att-class="{ active: state.currentRoute === '/about' }"
                                   href="/about" t-on-click="() => this.navigate('/about')">
                                   About
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" t-att-class="{ active: state.currentRoute === '/contact' }"
                                   href="/contact" t-on-click="() => this.navigate('/contact')">
                                   <i class="fa fa-envelope me-1"></i> Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="navbar-spacer"></div>
        </header>
    `;

    setup() {
        this.state = {
            ...routeState,
            logo: logo
        };
        
        // Xử lý scroll effect
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }


    navigate(path) {
        router.navigate(path);
    }
}

export default Header;
