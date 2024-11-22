from odoo import http
from odoo.http import request

class ThemeEcommerceController(http.Controller):
    @http.route(['/theme_ecommerce/config'], type='json', auth="public")
    def get_theme_config(self):
        """Return theme configuration for frontend"""
        return {
            'colors': {
                'primary': '#3498db',
                'secondary': '#2ecc71',
            },
            'breakpoints': {
                'sm': 576,
                'md': 768,
                'lg': 992,
                'xl': 1200,
            }
        } 