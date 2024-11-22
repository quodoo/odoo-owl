import { Component, useState } from "@odoo/owl";

export class ProductCard extends Component {
    static template = 'theme_ecommerce.ProductCard';
    static props = {
        product: {
            type: Object,
            shape: {
                id: Number,
                name: String,
                price: Number,
                image_url: String,
                currency: String,
            }
        },
        showQuickView: { type: Boolean, optional: true }
    };

    setup() {
        this.state = useState({
            isInWishlist: false,
            isInCart: false,
            showQuickView: false
        });
    }

    async addToCart() {
        try {
            await this.env.services.rpc({
                route: '/shop/cart/add',
                params: {
                    product_id: this.props.product.id,
                    quantity: 1
                }
            });
            this.state.isInCart = true;
        } catch (error) {
            this.env.services.notification.notify({
                type: 'danger',
                message: 'Failed to add product to cart'
            });
        }
    }
} 