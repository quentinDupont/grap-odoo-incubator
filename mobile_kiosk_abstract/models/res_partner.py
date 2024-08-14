# Copyright (C) 2024 - Today: GRAP (http://www.grap.coop)
# @author: Quentin DUPONT
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).


from odoo import fields, models


class ResPartner(models.Model):
    _inherit = 'res.partner'

    # These are required for manual attendance
    # attendance_state = fields.Selection(related='employee_id.attendance_state', readonly=True,
    #     groups="hr_attendance.group_hr_attendance_kiosk,hr_attendance.group_hr_attendance")
    # hours_today = fields.Float(related='employee_id.hours_today', readonly=True,
    #     groups="hr_attendance.group_hr_attendance_kiosk,hr_attendance.group_hr_attendance")
    # last_attendance_id = fields.Many2one(related='employee_id.last_attendance_id', readonly=True,
    #     groups="hr_attendance.group_hr_attendance_kiosk,hr_attendance.group_hr_attendance")
    # total_overtime = fields.Float(related='employee_id.total_overtime', readonly=True,
    #     groups="hr_attendance.group_hr_attendance_kiosk,hr_attendance.group_hr_attendance")

    def action_partner_kiosk_confirm(self):
        self.ensure_one()
        import pdb; pdb.set_trace()
        return {
            'type': 'ir.actions.client',
            'name': 'Confirm',
            # 'tag': 'hr_attendance_kiosk_confirm',
            # 'employee_id': self.id,
            # 'employee_name': self.name,
            # 'employee_state': self.attendance_state,
            # 'employee_hours_today': self.hours_today,
        }
