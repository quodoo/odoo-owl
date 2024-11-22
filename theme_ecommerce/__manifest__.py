{
    'name': 'Modern E-commerce Theme',
    'version': '1.0',
    'category': 'Theme/E-commerce',
    'sequence': 1,
    'summary': 'Modern and responsive e-commerce theme using OWL 2.0',
    'website': 'https://www.odoo.com',
    'depends': [
        'website',
        'website_sale',
        'web_editor',
    ],
    'data': [
        'views/layout.xml',
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            # SCSS
            'theme_ecommerce/static/src/scss/base/**/*',
            'theme_ecommerce/static/src/scss/components/**/*',
            # JavaScript
            'theme_ecommerce/static/src/js/components/**/*',
            # XML Templates
            'theme_ecommerce/static/src/xml/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
} 