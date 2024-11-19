import { Component, xml, useState, onWillStart } from "@odoo/owl";
import TrendingTrends from "@components/TrendingTrends/TrendingTrends";
import CryptoDetail from "@components/CryptoDetail/CryptoDetail";
import "./style.scss";
import { debounce } from "@utils/helpers";
import { CryptoApiService } from "@services/cryptoApi";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { CRYPTO_IDS, COIN_IMAGE_MAPPING } from '../../constants/crypto';

// Constants
const REFRESH_INTERVAL = 2 * 60 * 1000; // 2 minutes


class MarketTrendsPage extends Component {
    setup() {
        this.state = useState({
            cryptoData: [],
            loading: true,
            error: null,
            selectedCoin: null,
            lastUpdated: null,
            isUsingCachedData: false
        });

        onWillStart(async () => {
            await this.fetchCryptoData();
            this.startDataRefresh();
        });

        this.debouncedFetch = debounce(this.fetchCryptoData.bind(this), 500);
    }

    async fetchCryptoData() {
        const previousData = [...this.state.cryptoData];
        const previousTimestamp = this.state.lastUpdated;

        try {
            this.state.loading = true;
            
            // Fetch data for all coins at once
            const data = await CryptoApiService.fetchMarketData(CRYPTO_IDS);
            
            if (data) {
                const transformedData = CryptoApiService.transformMarketData(
                    data,
                    CRYPTO_IDS,
                    COIN_IMAGE_MAPPING
                );

                this.state.cryptoData = transformedData;
                this.state.lastUpdated = new Date().toLocaleString();
                this.state.error = null;
                this.state.isUsingCachedData = false;
            } else if (previousData.length > 0) {
                // Use previous data if fetch failed
                this.state.cryptoData = previousData;
                this.state.lastUpdated = previousTimestamp;
                this.state.isUsingCachedData = true;
                this.state.error = 'Using cached data - Unable to fetch new data';
            } else {
                this.state.error = 'No data available';
                this.state.cryptoData = [];
            }

        } catch (error) {
            console.warn('Error fetching crypto data:', error);
            if (previousData.length > 0) {
                this.state.cryptoData = previousData;
                this.state.lastUpdated = previousTimestamp;
                this.state.isUsingCachedData = true;
                this.state.error = 'Using cached data - Unable to fetch new data';
            } else {
                this.state.error = 'Failed to fetch crypto data';
                this.state.cryptoData = [];
            }
        } finally {
            this.state.loading = false;
        }
    }

    startDataRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        this.refreshInterval = setInterval(() => {
            if (!this.state.loading) {
                this.debouncedFetch();
            }
        }, REFRESH_INTERVAL);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 8
        }).format(price);
    }

    formatLargeNumber(number) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            compactDisplay: 'short'
        }).format(number);
    }

    showCoinDetail(coin) {
        this.state.selectedCoin = coin;
    }

    closeCoinDetail() {
        this.state.selectedCoin = null;
    }

    static template = xml`
        <div class="market-trends-page">
            <div class="page-header">
                <h1>Crypto Market Trends</h1>
                <p class="subtitle">
                    <t t-if="state.isUsingCachedData">
                        Displaying cached data (Last updated: <t t-esc="state.lastUpdated"/>)
                    </t>
                    <t t-else="">
                        Real-time cryptocurrency market data
                    </t>
                </p>
            </div>
            
            <div class="market-trends-content">
                <div class="market-summary">
                    <h2>Live Crypto Prices</h2>
                    <t t-if="state.loading and !state.cryptoData.length">
                        <div class="loading-indicator">
                            <span class="loader"></span>
                            <p>Fetching latest crypto data...</p>
                        </div>
                    </t>
                    <t t-elif="state.error and !state.cryptoData.length">
                        <div class="no-data">
                            <i class="fas fa-database"></i>
                            <p t-esc="state.error"/>
                            <button t-on-click="fetchCryptoData" class="retry-button">
                                <i class="fas fa-sync"></i> Retry
                            </button>
                        </div>
                    </t>
                    <t t-else="">
                        <div class="summary-grid">
                            <t t-foreach="state.cryptoData" t-as="crypto" t-key="crypto.id">
                                <div class="summary-card" t-on-click="() => this.showCoinDetail(crypto)">
                                    <t t-if="state.loading">
                                        <LoadingIndicator/>
                                    </t>
                                    <div class="crypto-header">
                                        <img t-att-src="crypto.image" t-att-alt="crypto.name" class="crypto-icon"/>
                                        <div class="crypto-title">
                                            <h3 t-esc="crypto.name"/>
                                            <span class="crypto-symbol" t-esc="crypto.symbol"/>
                                        </div>
                                    </div>
                                    
                                    <div class="price-section">
                                        <div class="current-price">
                                            <span class="value" t-esc="formatPrice(crypto.price)"/>
                                            <span t-attf-class="trend-change {{ crypto.change24h >= 0 ? 'positive' : 'negative' }}">
                                                (<t t-esc="crypto.change24h >= 0 ? '+' : ''"/><t t-esc="crypto.change24h.toFixed(2)"/>%)
                                            </span>
                                        </div>
                                    </div>

                                    <div class="crypto-details">
                                        <div class="detail-row">
                                            <span class="label">Market Cap:</span>
                                            <span class="value" t-esc="formatLargeNumber(crypto.marketCap)"/>
                                        </div>
                                        <div class="detail-row">
                                            <span class="label">24h Volume:</span>
                                            <span class="value" t-esc="formatLargeNumber(crypto.volume)"/>
                                        </div>
                                    </div>
                                </div>
                            </t>
                        </div>
                    </t>
                </div>
            </div>

            <t t-if="state.selectedCoin">
                <CryptoDetail 
                    coinId="state.selectedCoin.id"
                    name="state.selectedCoin.name"
                    symbol="state.selectedCoin.symbol"
                    image="state.selectedCoin.image"
                    price="state.selectedCoin.price"
                    change24h="state.selectedCoin.change24h"
                    marketCap="state.selectedCoin.marketCap"
                    volume="state.selectedCoin.volume"
                    high24h="state.selectedCoin.high24h || 0"
                    low24h="state.selectedCoin.low24h || 0"
                    formatPrice="formatPrice"
                    formatLargeNumber="formatLargeNumber"
                    onClose="() => this.state.selectedCoin = null"
                />
            </t>
        </div>
    `;

    static components = {
        TrendingTrends,
        CryptoDetail,
        LoadingIndicator
    };
}

export default MarketTrendsPage; 