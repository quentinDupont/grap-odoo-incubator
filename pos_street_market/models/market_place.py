# coding: utf-8
# Copyright (C) 2015 - Today: GRAP (http://www.grap.coop)
# @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from openerp import models, fields


class MarketPlace(models.Model):
    _name = 'market.place'

    # Default section
    def _default_company_id(self):
        return self.env.user.company_id.id

    # Columns section
    code = fields.Char(required=True, size=6)

    name = fields.Char(required=True)

    active = fields.Boolean(default=True)

    company_id = fields.Many2one(
        string='Company', comodel_name='res.company',
        default=_default_company_id)
