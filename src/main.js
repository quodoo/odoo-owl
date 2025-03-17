import { mount } from "@odoo/owl";
import { App } from "./App.js";

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Import custom SCSS
import './styles/style.scss';

mount(App, document.getElementById('app'));