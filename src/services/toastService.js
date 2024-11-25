import { reactive } from "@odoo/owl";

class ToastService {
    constructor() {
        this.state = reactive({
            toasts: []
        });
    }

    show(message, type = 'success') {
        const toast = {
            id: Date.now(),
            message,
            type
        };

        this.state.toasts = [...this.state.toasts, toast];

        // Auto remove after 3 seconds
        setTimeout(() => {
            this.remove(toast.id);
        }, 3000);
    }

    remove(id) {
        this.state.toasts = this.state.toasts.filter(t => t.id !== id);
    }
}

export const toastService = new ToastService(); 