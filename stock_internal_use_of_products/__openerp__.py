# coding: utf-8
# Copyright (C) 2018 - Today: GRAP (http://www.grap.coop)
# @author Julien WESTE
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    'name': 'Stock - Internal Use of products',
    'summary': "Declare the use of products for specific uses (eg: gifts,...)",
    'version': '8.0.2.0.0',
    'category': 'Stock',
    'author': 'GRAP',
    'website': 'http://www.grap.coop',
    'license': 'AGPL-3',
    'depends': [
        'stock_account',
    ],
    'data': [
        'data/ir_sequence.xml',
        'security/ir.model.access.csv',
        'security/ir_rule.xml',
        'views/templates.xml',
        'views/view_internal_use.xml',
        'views/view_internal_use_case.xml',
        'views/action.xml',
        'views/menu.xml',
        'views/view_internal_use_mass_generate_wizard.xml',
    ],
    'demo': [
        'demo/account_tax_code.xml',
        'demo/account_tax.xml',
        'demo/product_product.xml',
        'demo/res_groups.xml',
        'demo/internal_use_case.xml',
        'demo/internal_use.xml',
    ],
    'images': [
        'static/description/internal_use_form.png',
        'static/description/internal_use_case_form.png',
    ],
    'installable': False,
}