export const PRODUCTS = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400",
        description: "Latest iPhone with advanced features",
        category: "smartphones",
        isBestOffer: true,
        discount: 20,
        rating: 4.8
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=200",
        description: "Ultimate Android experience with AI features",
        category: "smartphones",
        brand: "Samsung",
        isBestOffer: true,
        discount: 15,
        rating: 4.9,
        stock: 45,
        specifications: {
            screen: "6.8 inch Dynamic AMOLED",
            processor: "Snapdragon 8 Gen 3",
            ram: "12GB",
            storage: "512GB"
        }
    },
    {
        id: 3,
        name: "MacBook Pro 16",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200",
        description: "Powerful laptop for professionals",
        category: "laptops",
        brand: "Apple",
        isBestOffer: true,
        discount: 8,
        rating: 4.9,
        stock: 30,
        specifications: {
            screen: "16 inch Liquid Retina XDR",
            processor: "M3 Max",
            ram: "32GB",
            storage: "1TB SSD"
        }
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 1999.99,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=200",
        description: "Premium Windows laptop",
        category: "laptops",
        brand: "Dell",
        isBestOffer: true,
        discount: 12,
        rating: 4.7,
        stock: 25,
        specifications: {
            screen: "15.6 inch 4K OLED",
            processor: "Intel i9-13900H",
            ram: "32GB",
            storage: "1TB SSD"
        }
    },
    {
        id: 5,
        name: "iPad Pro 12.9",
        price: 1099.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=200",
        description: "Professional tablet for creators",
        category: "tablets",
        brand: "Apple",
        isBestOffer: true,
        discount: 10,
        rating: 4.8,
        stock: 40,
        specifications: {
            screen: "12.9 inch Liquid Retina XDR",
            processor: "M2",
            ram: "16GB",
            storage: "512GB"
        }
    },
    {
        id: 6,
        name: "Samsung Galaxy Tab S9 Ultra",
        price: 1199.99,
        image: "https://images.unsplash.com/photo-1632634571086-bf1338416172?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1632634571086-bf1338416172?q=80&w=200",
        description: "Premium Android tablet",
        category: "tablets",
        brand: "Samsung",
        isBestOffer: false,
        discount: 15,
        rating: 4.7,
        stock: 35,
        specifications: {
            screen: "14.6 inch Super AMOLED",
            processor: "Snapdragon 8 Gen 2",
            ram: "16GB",
            storage: "512GB"
        }
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=200",
        description: "Premium noise-cancelling headphones",
        category: "audio",
        brand: "Sony",
        isBestOffer: true,
        discount: 20,
        rating: 4.9,
        stock: 60,
        specifications: {
            type: "Over-ear",
            battery: "30 hours",
            connectivity: "Bluetooth 5.2",
            features: "Active Noise Cancellation"
        }
    },
    {
        id: 8,
        name: "LG C3 OLED 65\"",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=200",
        description: "Premium OLED TV",
        category: "tv",
        brand: "LG",
        isBestOffer: true,
        discount: 15,
        rating: 4.8,
        stock: 20,
        specifications: {
            screen: "65 inch OLED",
            resolution: "4K",
            hdr: "Dolby Vision",
            refresh: "120Hz"
        }
    },
    {
        id: 9,
        name: "PlayStation 5",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=200",
        description: "Next-gen gaming console",
        category: "gaming-consoles",
        brand: "Sony",
        isBestOffer: true,
        discount: 5,
        rating: 4.9,
        stock: 15,
        specifications: {
            storage: "1TB SSD",
            resolution: "4K",
            fps: "120fps",
            features: "Ray Tracing"
        }
    },
    {
        id: 10,
        name: "Apple Watch Series 9",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=200",
        description: "Advanced smartwatch",
        category: "smartwatches",
        brand: "Apple",
        isBestOffer: true,
        discount: 10,
        rating: 4.8,
        stock: 50,
        specifications: {
            screen: "Always-On Retina",
            size: "45mm",
            battery: "18 hours",
            features: "ECG, Blood Oxygen"
        }
    },
    {
        id: 11,
        name: "Logitech G Pro X Superlight",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=200",
        description: "Ultra-lightweight gaming mouse",
        category: "gaming",
        brand: "Logitech",
        isBestOffer: true,
        discount: 15,
        rating: 4.8,
        stock: 40,
        specifications: {
            sensor: "HERO 25K",
            weight: "63g",
            battery: "70 hours",
            connectivity: "Wireless"
        }
    },
    {
        id: 12,
        name: "ASUS ROG Swift PG32UQX",
        price: 2999.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=200",
        description: "Premium gaming monitor",
        category: "monitors",
        brand: "Asus",
        isBestOffer: true,
        discount: 10,
        rating: 4.9,
        stock: 15,
        specifications: {
            screen: "32 inch Mini LED",
            resolution: "4K",
            refresh: "144Hz",
            hdr: "HDR 1400"
        }
    },
    {
        id: 13,
        name: "Sony A7 IV",
        price: 2499.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200",
        description: "Professional mirrorless camera",
        category: "cameras",
        brand: "Sony",
        isBestOffer: true,
        discount: 8,
        rating: 4.8,
        stock: 25,
        specifications: {
            sensor: "33MP Full-frame",
            iso: "100-51200",
            video: "4K 60fps",
            stabilization: "5-axis"
        }
    },
    {
        id: 14,
        name: "NETGEAR Orbi WiFi 6E",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=200",
        description: "Premium mesh WiFi system",
        category: "networking",
        brand: "Netgear",
        isBestOffer: false,
        discount: 12,
        rating: 4.7,
        stock: 30,
        specifications: {
            coverage: "9,000 sq ft",
            speed: "10.8 Gbps",
            band: "Tri-band",
            ports: "2.5G ports"
        }
    },
    {
        id: 15,
        name: "Samsung 990 PRO 4TB",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1601737487795-dab272f5c200?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1601737487795-dab272f5c200?q=80&w=200",
        description: "High-performance NVMe SSD",
        category: "storage",
        brand: "Samsung",
        isBestOffer: true,
        discount: 15,
        rating: 4.9,
        stock: 45,
        specifications: {
            capacity: "4TB",
            read: "7,450 MB/s",
            write: "6,900 MB/s",
            interface: "PCIe 4.0"
        }
    },
    {
        id: 16,
        name: "Meta Quest 3",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=200",
        description: "Advanced VR headset",
        category: "virtual-reality",
        brand: "Meta",
        isBestOffer: true,
        discount: 10,
        rating: 4.7,
        stock: 35,
        specifications: {
            resolution: "2064x2208 per eye",
            refresh: "120Hz",
            storage: "128GB",
            processor: "Snapdragon XR2 Gen 2"
        }
    },
    {
        id: 17,
        name: "Razer BlackWidow V4 Pro",
        price: 229.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=200",
        description: "Premium gaming keyboard",
        category: "gaming",
        brand: "Razer",
        isBestOffer: false,
        discount: 20,
        rating: 4.6,
        stock: 50,
        specifications: {
            switches: "Razer Green",
            lighting: "Chroma RGB",
            features: "Media controls",
            connectivity: "USB-C"
        }
    },
    {
        id: 18,
        name: "Canon EOS R5",
        price: 3899.99,
        image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=200",
        description: "Professional mirrorless camera",
        category: "cameras",
        brand: "Canon",
        isBestOffer: true,
        discount: 5,
        rating: 4.9,
        stock: 20,
        specifications: {
            sensor: "45MP Full-frame",
            video: "8K RAW",
            stabilization: "5-axis IBIS",
            autofocus: "Dual Pixel CMOS AF II"
        }
    },
    {
        id: 19,
        name: "Samsung Odyssey G9",
        price: 1599.99,
        image: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?q=80&w=200",
        description: "Ultra-wide gaming monitor",
        category: "monitors",
        brand: "Samsung",
        isBestOffer: true,
        discount: 15,
        rating: 4.8,
        stock: 25,
        specifications: {
            screen: "49 inch QLED",
            resolution: "5120x1440",
            refresh: "240Hz",
            curvature: "1000R"
        }
    },
    {
        id: 20,
        name: "Apple AirPods Pro 2",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=200",
        description: "Premium wireless earbuds",
        category: "audio",
        brand: "Apple",
        isBestOffer: true,
        discount: 10,
        rating: 4.8,
        stock: 55,
        specifications: {
            anc: "Active Noise Cancellation",
            battery: "6 hours",
            charging: "MagSafe",
            features: "Spatial Audio"
        }
    },
    {
        id: 21,
        name: "Amazon Echo Show 15",
        price: 279.99,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=200",
        description: "Smart display with Alexa",
        category: "smart-home",
        brand: "Amazon",
        isBestOffer: true,
        discount: 20,
        rating: 4.6,
        stock: 40,
        specifications: {
            screen: "15.6 inch",
            resolution: "1920x1080",
            features: "Visual ID, Widget View",
            camera: "5MP"
        }
    },
    {
        id: 22,
        name: "HP Color LaserJet Pro",
        price: 449.99,
        image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=200",
        description: "Professional color laser printer",
        category: "printers",
        brand: "HP",
        isBestOffer: false,
        discount: 15,
        rating: 4.5,
        stock: 25,
        specifications: {
            type: "Color Laser",
            speed: "28 ppm",
            connectivity: "WiFi, Ethernet",
            duplex: "Automatic"
        }
    },
    {
        id: 23,
        name: "Microsoft 365 Family",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200",
        description: "Complete productivity suite",
        category: "software",
        brand: "Microsoft",
        isBestOffer: true,
        discount: 25,
        rating: 4.8,
        stock: 999,
        specifications: {
            users: "Up to 6",
            storage: "1TB per user",
            apps: "Word, Excel, PowerPoint",
            duration: "1 year"
        }
    },
    {
        id: 24,
        name: "Arlo Pro 4 Spotlight Camera",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=200",
        description: "Wireless security camera",
        category: "security",
        brand: "Arlo",
        isBestOffer: true,
        discount: 15,
        rating: 4.7,
        stock: 35,
        specifications: {
            resolution: "2K HDR",
            vision: "Color Night Vision",
            battery: "6 months",
            weather: "Weather resistant"
        }
    },
    {
        id: 25,
        name: "APC UPS Pro 1500VA",
        price: 219.99,
        image: "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=200",
        description: "Battery backup & surge protector",
        category: "power",
        brand: "APC",
        isBestOffer: false,
        discount: 10,
        rating: 4.8,
        stock: 30,
        specifications: {
            capacity: "1500VA/900W",
            outlets: "10 outlets",
            runtime: "90 minutes",
            display: "LCD panel"
        }
    },
    {
        id: 26,
        name: "Ring Video Doorbell Pro 2",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=200",
        description: "Advanced video doorbell",
        category: "smart-home",
        brand: "Ring",
        isBestOffer: true,
        discount: 20,
        rating: 4.7,
        stock: 45,
        specifications: {
            resolution: "1536p HD",
            view: "Head to Toe",
            features: "3D Motion Detection",
            power: "Hardwired"
        }
    },
    {
        id: 27,
        name: "Norton 360 Deluxe",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200",
        description: "Comprehensive security suite",
        category: "software",
        brand: "Norton",
        isBestOffer: false,
        discount: 30,
        rating: 4.6,
        stock: 999,
        specifications: {
            devices: "5 devices",
            vpn: "Secure VPN",
            storage: "50GB Cloud Backup",
            duration: "1 year"
        }
    },
    {
        id: 28,
        name: "Philips Hue Starter Kit",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=400",
        thumbImage: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?q=80&w=200",
        description: "Smart lighting system",
        category: "smart-home",
        brand: "Philips",
        isBestOffer: true,
        discount: 15,
        rating: 4.8,
        stock: 50,
        specifications: {
            bulbs: "4 Color Bulbs",
            bridge: "Hue Bridge included",
            compatibility: "Alexa, Google Assistant",
            control: "Voice & App Control"
        }
    }
]; 