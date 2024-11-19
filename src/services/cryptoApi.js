import { StorageService, EXPIRATION } from './storageService';
import { CRYPTO_IDS } from '../constants/crypto';

// Trạng thái fetch của coin
const FETCH_STATUS = {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending'
};

// Thời gian retry khi fetch thất bại
const RETRY_INTERVAL = 30 * 1000; // 30 seconds

// Base API URL
const BASE_API_URL = 'https://api.coingecko.com/api/v3';

// Mixin cho việc xử lý fetch và cache
const FetchMixin = {
    async fetchWithRetry(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    buildApiUrl(endpoint) {
        return `${BASE_API_URL}${endpoint}`;
    }
};

// Mixin cho việc xử lý status
const StatusMixin = {
    updateStatus(coinId, status) {
        const timestamp = Date.now();
        this.coinStatus.set(coinId, { status, timestamp });
    },

    getStatus(coinId) {
        return this.coinStatus.get(coinId);
    },

    shouldRetry(coinId) {
        const status = this.getStatus(coinId);
        if (!status) return true;

        const timeSinceLastFetch = Date.now() - status.timestamp;
        return status.status === FETCH_STATUS.FAILED && timeSinceLastFetch >= RETRY_INTERVAL;
    }
};

export class CryptoApiService {
    static coinStatus = new Map();

    // Mixin các phương thức
    static fetch = FetchMixin.fetchWithRetry;
    static buildUrl = FetchMixin.buildApiUrl;
    static updateCoinStatus = StatusMixin.updateStatus;
    static getCoinStatus = StatusMixin.getStatus;
    static shouldRetryCoin = StatusMixin.shouldRetry;

    static async fetchMarketData(coinIds) {
        const cacheKey = StorageService.getCryptoKey('MARKET_DATA');
        const endpoint = `/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_market_cap=true`;
        
        try {
            const url = this.buildUrl(endpoint);
            const response = await this.fetch(url);
            
            if (response) {
                StorageService.save(cacheKey, response);
                return response;
            }
            
            // If fetch fails, try to get from cache
            const cachedData = StorageService.get(cacheKey);
            return cachedData?.data;
        } catch (error) {
            console.error('Error fetching market data:', error);
            // Try to get from cache if fetch fails
            const cachedData = StorageService.get(cacheKey);
            return cachedData?.data;
        }
    }

    static async fetchCoinDetail(coinId) {
        const cacheKey = StorageService.getCryptoKey('DETAIL_DATA', coinId);
        const endpoint = `/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`;
        
        return this.fetchWithCache(endpoint, cacheKey, [coinId]);
    }

    static async fetchCoinHistory(coinId, days = 7) {
        const cacheKey = StorageService.getCryptoKey('HISTORY_DATA', coinId);
        const endpoint = `/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
        
        return this.fetchWithCache(endpoint, cacheKey, [coinId], EXPIRATION.LONG);
    }

    static async fetchWithCache(endpoint, cacheKey, coinIds, expiration = EXPIRATION.MEDIUM) {
        try {
            // Kiểm tra cache trước
            const cachedData = StorageService.get(cacheKey);
            if (cachedData && !this.shouldFetchCoins(coinIds)) {
                return cachedData.data;
            }

            // Cập nhật trạng thái pending cho tất cả coin
            coinIds.forEach(id => this.updateCoinStatus(id, FETCH_STATUS.PENDING));

            // Thực hiện fetch
            const data = await this.fetch(this.buildUrl(endpoint));
            
            // Lưu cache và cập nhật trạng thái thành công
            StorageService.save(cacheKey, data, expiration);
            coinIds.forEach(id => this.updateCoinStatus(id, FETCH_STATUS.SUCCESS));
            
            return data;
        } catch (error) {
            // Cập nhật trạng thái thất bại
            coinIds.forEach(id => this.updateCoinStatus(id, FETCH_STATUS.FAILED));

            // Thử lấy từ cache nếu có lỗi
            const cachedData = StorageService.get(cacheKey);
            if (cachedData) {
                console.warn(`Using cached data for ${endpoint} due to error:`, error.message);
                return cachedData.data;
            }
            throw error;
        }
    }

    static shouldFetchData(key = null) {
        if (key) {
            // Kiểm tra fetch cho một key cụ thể
            return StorageService.shouldUpdate(key);
        }

        // Kiểm tra fetch cho tất cả coins
        return this.shouldFetchCoins(CRYPTO_IDS);
    }

    static shouldFetchCoins(coinIds) {
        return coinIds.some(coinId => {
            const status = this.getCoinStatus(coinId);
            if (!status) return true;

            if (status.status === FETCH_STATUS.FAILED) {
                return this.shouldRetryCoin(coinId);
            }

            return status.status !== FETCH_STATUS.PENDING;
        });
    }

    static getStoredData(key = null) {
        if (key) {
            return StorageService.get(key);
        }
        return StorageService.get(StorageService.getCryptoKey('MARKET_DATA'));
    }

    // Transform methods
    static transformMarketData(data, coinIds, coinMapping) {
        return coinIds.map(id => {
            const coinInfo = coinMapping[id];
            const status = this.getCoinStatus(id);
            return {
                id,
                symbol: coinInfo?.symbol.toUpperCase() || id.toUpperCase(),
                name: coinInfo?.name || id.charAt(0).toUpperCase() + id.slice(1),
                price: data[id]?.usd || 0,
                change24h: data[id]?.usd_24h_change || 0,
                marketCap: data[id]?.usd_market_cap || 0,
                volume: data[id]?.usd_24h_vol || 0,
                image: coinInfo?.image || '',
                status: status?.status || FETCH_STATUS.PENDING,
                lastUpdated: status?.timestamp ? new Date(status.timestamp).toLocaleString() : null
            };
        });
    }

    static transformHistoryData(data) {
        return data.prices.map(([timestamp, price]) => ({
            time: new Date(timestamp).toLocaleDateString(),
            price
        }));
    }
} 