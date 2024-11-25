import { Component, xml } from "@odoo/owl";
import { toastService } from "@services/toastService";
import "./style.scss";

export default class Toast extends Component {
    static template = xml`
        <div class="toast-container" t-if="toastService.state.toasts.length">
            <div t-foreach="toastService.state.toasts" 
                 t-as="toast" 
                 t-key="toast.id"
                 class="toast-item"
                 t-att-class="toast.type">
                <span t-esc="toast.message"/>
                <button class="toast-close" t-on-click="() => this.closeToast(toast.id)">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    setup() {
        this.toastService = toastService;
    }

    closeToast(id) {
        this.toastService.remove(id);
    }
} 