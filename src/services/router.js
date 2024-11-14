import { reactive } from '@odoo/owl';

// Create reactive state
export const routeState = reactive({ 
    currentRoute: window.location.pathname || '/' 
});

// Handle route changes
window.addEventListener('popstate', () => {
    routeState.currentRoute = window.location.pathname;
});

export const router = {
    navigate(path) {
        // Prevent default navigation
        if (path === routeState.currentRoute) return;
        
        // Update history and state
        window.history.pushState({}, '', path);
        routeState.currentRoute = path;
        
        // Trigger a custom event for route change
        window.dispatchEvent(new CustomEvent('route-changed', { detail: path }));
    }
}; 