# Copyright (C) 2018 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# @author: Quentin DUPONT (quentin.dupont@grap.coop)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import api, models


class StockQuant(models.Model):
    _inherit = "stock.quant"

    @api.model_create_multi
    def create(self, vals):
        return super(
            StockQuant, self.with_context(do_not_check_duplicates=True)
        ).create(vals)

    def write(self, vals):
        return super(
            StockQuant, self.with_context(do_not_check_duplicates=True)
        ).write(vals)

    @api.model
    def search(self, domain, *args, **kwargs):
        if self.env.context.get("do_not_check_duplicates", False):
            domain = [("product_id", "=", False)]
        return super(StockQuant, self).search(domain, *args, **kwargs)
