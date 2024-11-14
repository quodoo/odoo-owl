import { mount } from "@odoo/owl";
import MainLayout from "@layouts/MainLayout";

// Global styles
import "@scss/style.scss";

// Mount the application
mount(MainLayout, document.getElementById("root"));
