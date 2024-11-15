import { Component, xml } from "@odoo/owl";
import { router, routeState } from "@services/router";
import "./style.scss";

class Header extends Component {
    static template = xml`
        <header class="main-header">
            <div class="container">
                <nav class="nav-menu">
                    <div class="rainbow-text">
                        <a t-on-click="() => this.navigate('/')" href="/" class="rainbow-text-item">
                            <span class="highlight">Odoo OWL</span>
                        </a>
                    </div>
                    <ul class="nav-links">
                        <li>
                            <a t-on-click="() => this.navigate('/')" 
                               href="/" 
                               t-att-class="{ active: state.currentRoute === '/' }">
                               Home
                            </a>
                        </li>
                        <li>
                            <a t-on-click="() => this.navigate('/about')" 
                               href="/about" 
                               t-att-class="{ active: state.currentRoute === '/about' }">
                               About
                            </a>
                        </li>
                        <li>
                            <a t-on-click="() => this.navigate('/contact')" 
                               href="/contact" 
                               t-att-class="{ active: state.currentRoute === '/contact' }">
                               <i class="fa fa-envelope"></i> Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    `;

    setup() {
        this.state = routeState;
    }

    navigate(path) {
        router.navigate(path);
    }
}

export default Header;