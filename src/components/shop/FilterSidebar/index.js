import { Component, xml } from "@odoo/owl";
import "./style.scss";

export class FilterSidebar extends Component {
    static template = xml`
        <div class="filter-sidebar">
            <!-- Price Range Filter -->
            <div class="filter-section">
                <h3>Price Range</h3>
                <div class="price-range">
                    <input 
                        type="range" 
                        t-att-min="props.priceRange.min"
                        t-att-max="props.priceRange.max"
                        t-att-value="props.priceRange.current.min"
                        t-on-input="(ev) => this.updatePriceRange('min', ev.target.value)"
                    />
                    <input 
                        type="range"
                        t-att-min="props.priceRange.min"
                        t-att-max="props.priceRange.max"
                        t-att-value="props.priceRange.current.max"
                        t-on-input="(ev) => this.updatePriceRange('max', ev.target.value)"
                    />
                    <div class="price-inputs">
                        <input 
                            type="number"
                            t-att-value="props.priceRange.current.min"
                            t-on-change="(ev) => this.updatePriceRange('min', ev.target.value)"
                        />
                        <input 
                            type="number"
                            t-att-value="props.priceRange.current.max"
                            t-on-change="(ev) => this.updatePriceRange('max', ev.target.value)"
                        />
                    </div>
                </div>
            </div>

            <!-- Brand Filter -->
            <div class="filter-section">
                <h3>Brands</h3>
                <div class="filter-options">
                    <t t-foreach="props.filters.brands" t-as="brand" t-key="brand">
                        <label class="checkbox-label">
                            <input 
                                type="checkbox"
                                t-att-checked="props.selectedFilters.brands.includes(brand)"
                                t-on-change="() => this.toggleFilter('brands', brand)"
                            />
                            <span t-esc="brand"/>
                        </label>
                    </t>
                </div>
            </div>

            <!-- Other filters (colors, sizes, ratings) following similar pattern -->
            
            <!-- Availability Filter -->
            <div class="filter-section">
                <h3>Availability</h3>
                <label class="checkbox-label">
                    <input 
                        type="checkbox"
                        t-att-checked="props.selectedFilters.availability"
                        t-on-change="() => this.toggleAvailability()"
                    />
                    <span>In Stock Only</span>
                </label>
            </div>
        </div>
    `;

    static props = {
        filters: Object,
        selectedFilters: Object,
        onFilterChange: Function,
        priceRange: Object,
        onPriceRangeChange: Function
    };

    toggleFilter(type, value) {
        const newFilters = { ...this.props.selectedFilters };
        const index = newFilters[type].indexOf(value);
        
        if (index === -1) {
            newFilters[type] = [...newFilters[type], value];
        } else {
            newFilters[type] = newFilters[type].filter(v => v !== value);
        }
        
        this.props.onFilterChange(newFilters);
    }

    toggleAvailability() {
        const newFilters = { 
            ...this.props.selectedFilters,
            availability: !this.props.selectedFilters.availability 
        };
        this.props.onFilterChange(newFilters);
    }

    updatePriceRange(type, value) {
        const newRange = {
            ...this.props.priceRange.current,
            [type]: parseInt(value)
        };
        this.props.onPriceRangeChange(newRange);
    }
} 