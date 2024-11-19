import { Component, xml, useState, onWillStart, onMounted, onWillUnmount, useRef } from "@odoo/owl";
import Chart from 'chart.js/auto';
import "./CryptoDetail.scss";
import { CryptoApiService } from '../../services/cryptoApi';

// Import các hằng số từ CryptoApiService
const { DETAIL_DATA_KEY, HISTORY_DATA_KEY } = {
    DETAIL_DATA_KEY: 'crypto_detail_data',
    HISTORY_DATA_KEY: 'crypto_history_data'
};

const MIN_FETCH_INTERVAL = 30 * 1000; // 30 sec

class CryptoDetail extends Component {
    setup() {
        this.state = useState({
            chartData: [],
            description: '',
            loading: true,
            error: null,
            lastUpdated: null
        });

        this.chart = null;
        this.updateInterval = null;
        this.chartRef = useRef('chartCanvas');

        onWillStart(async () => {
            await this.loadData();
        });

        onMounted(() => {
            this.initChart();
            this.startDataUpdate();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
            if (this.updateInterval) {
                clearInterval(this.updateInterval);
            }
        });
    }

    async loadData() {
        try {
            const [detailData, historyData] = await Promise.all([
                CryptoApiService.fetchCoinDetail(this.props.coinId),
                CryptoApiService.fetchCoinHistory(this.props.coinId)
            ]);

            this.state.description = detailData.description.en.split('. ')[0] + '.';
            this.state.chartData = CryptoApiService.transformHistoryData(historyData);
            this.state.lastUpdated = new Date().toLocaleString();
            this.state.loading = false;

            if (this.chart) {
                this.updateChart();
            }
        } catch (error) {
            console.error('Error loading coin data:', error);
            this.state.error = 'Failed to load coin data';
            this.state.loading = false;
        }
    }

    initChart() {
        const canvas = document.querySelector('#priceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Type assertion for TypeScript
        if (!(ctx instanceof CanvasRenderingContext2D)) return;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.chartData.map(data => data.time),
                datasets: [{
                    label: 'Price (USD)',
                    data: this.state.chartData.map(data => data.price),
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let value = context.parsed.y;
                                if (typeof value === 'number') {
                                    return `$${value.toFixed(2)}`;
                                }
                                return value;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                if (typeof value === 'number') {
                                    return '$' + value.toFixed(2);
                                }
                                return value;
                            }
                        }
                    }
                }
            }
        });
    }

    updateChart() {
        if (this.chart) {
            this.chart.data.labels = this.state.chartData.map(data => data.time);
            this.chart.data.datasets[0].data = this.state.chartData.map(data => data.price);
            this.chart.update();
        }
    }

    startDataUpdate() {
        this.updateInterval = setInterval(() => {
            const shouldFetchDetail = CryptoApiService.shouldFetchData(`${DETAIL_DATA_KEY}_${this.props.coinId}`);
            const shouldFetchHistory = CryptoApiService.shouldFetchData(`${HISTORY_DATA_KEY}_${this.props.coinId}`);

            if (shouldFetchDetail || shouldFetchHistory) {
                this.loadData();
            }
        }, MIN_FETCH_INTERVAL);
    }

    static template = xml`
        <div class="crypto-detail-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="coin-info">
                        <img t-att-src="props.image" t-att-alt="props.name" class="coin-icon"/>
                        <h2><t t-esc="props.name"/> (<t t-esc="props.symbol"/>)</h2>
                    </div>
                    <button class="close-button" t-on-click="props.onClose">×</button>
                </div>

                <div class="modal-body">
                    <t t-if="state.loading">
                        <div class="loading">Loading data...</div>
                    </t>
                    <t t-elif="state.error">
                        <div class="error-message" t-esc="state.error"/>
                    </t>
                    <t t-else="">
                        <div class="price-section">
                            <div class="current-price">
                                <span class="label">Current Price:</span>
                                <span class="value" t-esc="props.formatPrice(props.price)"/>
                                <span t-attf-class="change {{ props.change24h >= 0 ? 'positive' : 'negative' }}">
                                    (<t t-esc="props.change24h >= 0 ? '+' : ''"/><t t-esc="props.change24h.toFixed(2)"/>%)
                                </span>
                            </div>
                        </div>

                        <div class="description" t-esc="state.description"/>

                        <div class="chart-container">
                            <h3>Price History (7 Days)</h3>
                            <canvas t-ref="chartCanvas" id="priceChart"></canvas>
                        </div>

                        <div class="market-stats">
                            <div class="stat-item">
                                <span class="label">Market Cap:</span>
                                <span class="value" t-esc="props.formatLargeNumber(props.marketCap)"/>
                            </div>
                            <div class="stat-item">
                                <span class="label">24h Volume:</span>
                                <span class="value" t-esc="props.formatLargeNumber(props.volume)"/>
                            </div>
                            <div class="stat-item">
                                <span class="label">24h High/Low:</span>
                                <span class="value">
                                    <t t-esc="props.formatPrice(props.low24h)"/> / <t t-esc="props.formatPrice(props.high24h)"/>
                                </span>
                            </div>
                        </div>

                        <div t-if="state.lastUpdated" class="last-updated">
                            Last updated: <t t-esc="state.lastUpdated"/>
                        </div>
                    </t>
                </div>
            </div>
        </div>
    `;

    static props = {
        coinId: String,
        name: String,
        symbol: String,
        image: String,
        price: Number,
        change24h: Number,
        marketCap: Number,
        volume: Number,
        high24h: Number,
        low24h: Number,
        formatPrice: Function,
        formatLargeNumber: Function,
        onClose: Function
    };
}

export default CryptoDetail; 