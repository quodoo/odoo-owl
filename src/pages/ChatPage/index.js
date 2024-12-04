import { Component, xml, useState, onMounted, onWillUnmount } from "@odoo/owl";

import "./style.scss";

export default class ChatPage extends Component {
    static template = xml`
        <div class="chat-page">
            <div class="chat-container">
                <div class="chat-header">
                    <h2>WebSocket Chat</h2>
                    <span t-if="state.connected" class="status connected">Connected</span>
                    <span t-else="" class="status disconnected">Disconnected</span>
                </div>

                <div class="messages-container" t-ref="messagesContainer">
                    <t t-foreach="state.messages" t-as="message" t-key="message.id">
                        <div class="message" t-attf-class="message {{ message.type }}">
                            <span class="message-time">[<t t-esc="message.time"/>]</span>
                            <span class="message-content" t-esc="message.content"/>
                        </div>
                    </t>
                </div>

                <div class="chat-input">
                    <form t-on-submit.prevent="sendMessage">
                        <input 
                            type="text" 
                            t-model="state.inputMessage"
                            placeholder="Type your message here..."
                            t-ref="messageInput"
                        />
                        <button 
                            type="submit" 
                            t-att-disabled="!state.connected || !state.inputMessage"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    setup() {
        this.state = useState({
            messages: [],
            connected: false,
            inputMessage: "",
        });

        onMounted(() => {
            this.initWebSocket();
        });

        onWillUnmount(() => {
            if (this.ws) {
                this.ws.close();
            }
        });
    }

    initWebSocket() {
        try {
            this.ws = new WebSocket('ws://localhost:8080/websocket');
            
            this.ws.onopen = () => {
                this.state.connected = true;
                this.addMessage('System', 'Connected to server');
            };

            this.ws.onclose = () => {
                this.state.connected = false;
                this.addMessage('System', 'Disconnected from server');
                // Try to reconnect after 5 seconds
                setTimeout(() => this.initWebSocket(), 5000);
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.addMessage('Error', 'Connection error occurred');
            };

            this.ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.addMessage('Received', message.content);
            };

        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.addMessage('Error', 'Failed to connect to server');
        }
    }

    addMessage(type, content) {
        const message = {
            id: Date.now(),
            type: type.toLowerCase(),
            content: content,
            time: new Date().toLocaleTimeString()
        };
        
        this.state.messages = [...this.state.messages, message];
        this.scrollToBottom();
    }

    sendMessage() {
        if (!this.state.inputMessage || !this.state.connected) return;

        try {
            this.ws.send(JSON.stringify({
                content: this.state.inputMessage
            }));
            
            this.addMessage('Sent', this.state.inputMessage);
            this.state.inputMessage = "";
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('Error', 'Failed to send message');
        }
    }

    scrollToBottom() {
        if (!this.refs) return;
        
        setTimeout(() => {
            const container = this.refs.messagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 0);
    }
} 