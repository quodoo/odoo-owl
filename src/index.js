import { mount } from "@odoo/owl";
import MainLayout from "@layouts/MainLayout";

// Global styles
import "@scss/style.scss";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

// Mount the application
mount(MainLayout, document.getElementById("root"));
