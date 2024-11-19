import { reactive } from "@odoo/owl";
// import MarketTrendsPage from "../pages/MarketTrends";

// Create reactive state
const routeState = reactive({ 
    currentRoute: window.location.pathname || "/" 
});

// Handle route changes
window.addEventListener("popstate", () => {
    routeState.currentRoute = window.location.pathname;
});

const router = {
    navigate(path) {
        // Prevent default navigation
        if (path === routeState.currentRoute) return;
        
        // Update history and state
        window.history.pushState({}, "", path);
        routeState.currentRoute = path;
        
        // Trigger a custom event for route change
        window.dispatchEvent(new CustomEvent("route-changed", { detail: path }));
    }
}; 




export { routeState, router };