import { Component, xml, useState, onWillStart } from "@odoo/owl";
import "./TrendingTrends.scss";

// Mock API data - in a real app, this would come from an actual API
const MOCK_TRENDS = [
    {
        id: 1,
        title: "Artificial Intelligence in Healthcare",
        description: "AI-powered diagnostic tools and personalized medicine solutions are revolutionizing healthcare delivery.",
        price: 156.78,
        change: 2.3
    },
    {
        id: 2,
        title: "Sustainable Energy Storage",
        description: "Advanced battery technologies enabling renewable energy integration and grid stability.",
        price: 89.45,
        change: -1.2
    },
    {
        id: 3,
        title: "Quantum Computing",
        description: "Breakthrough in quantum processors enabling complex calculations at unprecedented speeds.",
        price: 234.90,
        change: 5.7
    },
    {
        id: 4,
        title: "Space Tourism",
        description: "Commercial space travel becoming accessible to civilian passengers.",
        price: 567.30,
        change: 8.9
    },
    {
        id: 5,
        title: "Metaverse Development",
        description: "Virtual reality platforms for social interaction and business applications.",
        price: 45.67,
        change: -3.4
    },
    {
        id: 6,
        title: "Autonomous Vehicles",
        description: "Self-driving technology advancing with improved safety features.",
        price: 123.45,
        change: 1.8
    },
    {
        id: 7,
        title: "Biotechnology Innovation",
        description: "Gene editing and synthetic biology breakthroughs in medicine.",
        price: 345.67,
        change: 4.5
    },
    {
        id: 8,
        title: "Cybersecurity Solutions",
        description: "Advanced threat detection and prevention systems using ML.",
        price: 78.90,
        change: -0.9
    },
    {
        id: 9,
        title: "5G Infrastructure",
        description: "Expansion of high-speed wireless networks globally.",
        price: 167.23,
        change: 3.2
    },
    {
        id: 10,
        title: "Green Hydrogen",
        description: "Renewable hydrogen production for clean energy applications.",
        price: 89.12,
        change: 6.7
    }
];

class TrendingTrends extends Component {
    setup() {
        this.state = useState({
            trends: [],
            loading: true
        });

        onWillStart(async () => {
            // Simulate API call
            await this.fetchTrends();
            this.startPriceUpdates();
        });
    }

    async fetchTrends() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.state.trends = MOCK_TRENDS;
        this.state.loading = false;
    }

    startPriceUpdates() {
        // Update prices every 5 seconds
        setInterval(() => {
            this.state.trends = this.state.trends.map(trend => ({
                ...trend,
                price: +(trend.price + (Math.random() - 0.5) * 2).toFixed(2),
                change: +(trend.change + (Math.random() - 0.5)).toFixed(1)
            }));
        }, 5000);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    }
}

TrendingTrends.template = xml`
    <div class="trending-trends">
        <h2>Trending Market Insights</h2>
        <div class="trends-container">
            <t t-if="state.loading">
                <div class="loading">Loading trends...</div>
            </t>
            <t t-else="">
                <div class="trends-grid">
                    <t t-foreach="state.trends" t-as="trend" t-key="trend.id">
                        <div class="trend-card">
                            <h3 class="trend-title" t-esc="trend.title"/>
                            <p class="trend-description" t-esc="trend.description"/>
                            <div class="trend-metrics">
                                <span class="trend-price" t-esc="formatPrice(trend.price)"/>
                                <span t-attf-class="trend-change {{ trend.change >= 0 ? 'positive' : 'negative' }}">
                                    <t t-esc="trend.change >= 0 ? '+' : ''"/><t t-esc="trend.change"/>%
                                </span>
                            </div>
                        </div>
                    </t>
                </div>
            </t>
        </div>
    </div>
`;

export default TrendingTrends; 