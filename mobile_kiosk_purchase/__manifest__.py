# Copyright (C) 2020 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    "name": "Mobile Kiosk Purchase",
    "version": "16.0.1.0.0",
    "author": "GRAP",
    "summary": "Mobile interface to make purchases",
    "category": "Tools",
    "website": "https://github.com/grap/grap-odoo-incubator",
    "license": "AGPL-3",
    "maintainers": ["legalsylvain"],
    "depends": [
        "purchase",
        # GRAP
        "mobile_kiosk_abstract",
        # OCA
        "product_supplierinfo_qty_multiplier",
    ],
    "data": [
        "data/mobile_kiosk_application.xml",
    ],
    "qweb": [
        "static/src/xml/mobile_kiosk_purchase.xml",
    ],
    "assets": {
       "web.assets_backend": [
            "/mobile_kiosk_purchase/static/src/js/purchase_action.js",
            "/mobile_kiosk_purchase/static/src/js/set_supplier.js",
            "/mobile_kiosk_purchase/static/src/js/set_product.js",
            "/mobile_kiosk_purchase/static/src/js/set_quantity.js",
            "/mobile_kiosk_purchase/static/src/js/kanban_view_handler.js"
        ]
    },
    "installable": True,
}

