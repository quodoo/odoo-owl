// Storage keys
export const STORAGE_KEYS = {
    MARKET_DATA: 'crypto_market_data',
    DETAIL_DATA: 'crypto_detail_data',
    HISTORY_DATA: 'crypto_history_data',
    LAST_FETCH: 'crypto_last_fetch_time',
    SETTINGS: 'crypto_user_settings'
};

// Default expiration times
export const EXPIRATION = {
    SHORT: 30 * 1000,        // 30 seconds
    MEDIUM: 5 * 60 * 1000,   // 5 minutes
    LONG: 30 * 60 * 1000,    // 30 minutes
    DAY: 24 * 60 * 60 * 1000 // 24 hours
};

export class StorageService {
    static save(key, data, expiration = EXPIRATION.MEDIUM) {
        try {
            const item = {
                data,
                timestamp: Date.now(),
                expiration
            };
            localStorage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.warn('Error saving to localStorage:', error);
            return false;
        }
    }

    static get(key) {
        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            const { data, timestamp, expiration } = JSON.parse(item);
            const now = Date.now();

            // Check if data has expired
            if (now - timestamp > expiration) {
                this.remove(key);
                return null;
            }

            return {
                data,
                timestamp,
                age: now - timestamp
            };
        } catch (error) {
            console.warn('Error reading from localStorage:', error);
            return null;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.warn('Error removing from localStorage:', error);
            return false;
        }
    }

    static clear(pattern = null) {
        try {
            if (pattern) {
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith(pattern)) {
                        localStorage.removeItem(key);
                    }
                });
            } else {
                localStorage.clear();
            }
            return true;
        } catch (error) {
            console.warn('Error clearing localStorage:', error);
            return false;
        }
    }

    static isExpired(key) {
        const item = this.get(key);
        return !item;
    }

    static getTimeSinceLastUpdate(key) {
        const item = this.get(key);
        return item ? Date.now() - item.timestamp : Infinity;
    }

    static shouldUpdate(key, minInterval = EXPIRATION.MEDIUM) {
        const timeSinceLastUpdate = this.getTimeSinceLastUpdate(key);
        return timeSinceLastUpdate >= minInterval;
    }

    // Utility method for crypto data
    static getCryptoKey(type, id = null) {
        const baseKey = STORAGE_KEYS[type];
        return id ? `${baseKey}_${id}` : baseKey;
    }

    // Method to handle versioning of stored data
    static migrate() {
        // Add migration logic here when storage structure changes
    }
} 