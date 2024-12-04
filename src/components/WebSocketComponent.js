import { Component,  onMounted, onWillUnmount } from "@odoo/owl";


export default class WebSocketComponent extends Component {
    static props = {};
    static components = {};

    setup() {
        this.state = {
            messages: [],
            connected: false
        };
        
        onMounted(async () => {
            await this.initWebSocket();
        });

        onWillUnmount(() => {
            this.closeWebSocket();
        });
    }

    async initWebSocket() {
        try {
            this.ws = new WebSocket('ws://localhost:8080/websocket');
            this.ws.binaryType = "arraybuffer";

            this.ws.addEventListener('open', (event) => this.handleOpen(event));
            this.ws.addEventListener('message', (event) => this.handleMessage(event));
            this.ws.addEventListener('close', (event) => this.handleClose(event));
            this.ws.addEventListener('error', (event) => this.handleError(event));
        } catch (error) {
            console.error('WebSocket connection error:', error);
        }
    }

    handleOpen(event) {
        console.log(`WebSocket connected ${event}`);
        this.state.connected = true;
    }

    handleMessage(event) {
        const message = JSON.parse(event.data);
        this.state.messages = [...this.state.messages, message];
        console.log('Received message:', message);
    }

    handleClose(event) {
        console.log(`WebSocket disconnected ${event}`);
        this.state.connected = false;
    }

    handleError(event) {
        console.error('WebSocket error:', event);
    }

    closeWebSocket() {
        if (this.ws) {
            this.ws.close();
        }
    }
}