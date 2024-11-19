import { Component, xml, useState, onWillStart, onMounted, onWillUnmount } from "@odoo/owl";
import Chart from 'chart.js/auto';
import { CryptoApiService } from '../../services/cryptoApi';
import { CRYPTO_IDS } from '../../constants/crypto';
import "./MarketChart.scss";

class MarketChart extends Component {
    setup() {
        this.state = useState({
            marketData: [],
            loading: true,
            error: null
        });

        this.chart = null;

        onWillStart(async () => {
            await this.fetchMarketData();
        });

        onMounted(() => {
            this.initChart();
            this.startDataRefresh();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }
        });
    }

    async fetchMarketData() {
        try {
            const data = await CryptoApiService.fetchMarketData(CRYPTO_IDS);
            if (data) {
                this.state.marketData = CryptoApiService.transformMarketData(
                    data,
                    CRYPTO_IDS,
                    {}
                );
                if (this.chart) {
                    this.updateChart();
                }
            }
        } catch (error) {
            console.error('Error fetching market data:', error);
            this.state.error = 'Failed to fetch market data';
        } finally {
            this.state.loading = false;
        }
    }

    initChart() {
        const ctx = document.getElementById('marketChart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.marketData.map(coin => coin.symbol),
                datasets: [{
                    label: 'Price (USD)',
                    data: this.state.marketData.map(coin => coin.price),
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }, {
                    label: '24h Change (%)',
                    data: this.state.marketData.map(coin => coin.change24h),
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'percentage'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                let value = context.parsed.y;
                                if (context.datasetIndex === 0) {
                                    return `${label}: $${value.toFixed(2)}`;
                                } else {
                                    return `${label}: ${value.toFixed(2)}%`;
                                }
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Price (USD)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(2);
                            }
                        }
                    },
                    percentage: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: '24h Change (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(2) + '%';
                            }
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }

    updateChart() {
        if (this.chart) {
            this.chart.data.labels = this.state.marketData.map(coin => coin.symbol);
            this.chart.data.datasets[0].data = this.state.marketData.map(coin => coin.price);
            this.chart.data.datasets[1].data = this.state.marketData.map(coin => coin.change24h);
            this.chart.update();
        }
    }

    startDataRefresh() {
        this.refreshInterval = setInterval(() => {
            this.fetchMarketData();
        }, 30000); // Update every 30 seconds
    }

    static template = xml`
        <div class="market-chart-container">
            <div class="chart-header">
                <h2>Crypto Market Overview</h2>
                <p class="subtitle">Real-time price and 24h change comparison</p>
            </div>
            <div class="chart-wrapper">
                <t t-if="state.loading">
                    <div class="loading">Loading market data...</div>
                </t>
                <t t-elif="state.error">
                    <div class="error-message" t-esc="state.error"/>
                </t>
                <t t-else="">
                    <canvas id="marketChart"></canvas>
                </t>
            </div>
        </div>
    `;
}

export default MarketChart; 