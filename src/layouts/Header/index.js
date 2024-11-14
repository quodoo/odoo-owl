import { Component, xml } from "@odoo/owl";
import { router, routeState } from "@services/router";
import "./style.scss";

class Header extends Component {
    static template = xml`
        <header class="main-header">
            <div class="container">
                <nav class="nav-menu">
                    <div class="logo">
                        <a t-on-click="() => this.navigate('/')" href="/">Odoo OWL</a>
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
                               Contact
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
        // Prevent default behavior
        event.preventDefault();
        // Navigate using router
        router.navigate(path);
    }
}

export default Header;