# @author Quentin DUPONT <quentin.dupont@grap.coop>
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo.exceptions import UserError
from odoo.tests.common import TransactionCase


class TestAccountMovePartnerFields(TransactionCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Copy an existing demo invoice
        cls.move_1 = cls.env.ref("account.2_demo_invoice_1").copy()

    def test_action_post_partner_required_fields(self):
        partner = self.move_1.partner_id

        # Simulate no data
        partner.write(
            {
                "street": False,
                "zip": False,
                "city": False,
                "siren": False,
                "is_company": True,
            }
        )

        self.move_1._compute_partner_has_required_fields()
        self.assertFalse(self.move_1.partner_has_siren, "SIREN should be False")
        self.assertFalse(self.move_1.partner_has_address, "Address should be False")
        self.assertTrue(
            self.move_1.partner_is_company, "partner_is_company should be True"
        )

        # Should fail
        with self.assertRaises(UserError):
            self.move_1.action_post()

        # Fill all needed informations
        partner.write(
            {
                "street": "25 PASSAGE DUBAIL",
                "zip": "75010",
                "city": "PARIS",
                "siren": "828130799",
            }
        )

        self.move_1._compute_partner_has_required_fields()
        self.assertTrue(self.move_1.partner_has_siren, "SIREN should be True")
        self.assertTrue(self.move_1.partner_has_address, "Address should be True")

        # Should succeed
        try:
            self.move_1.action_post()
        except UserError:
            self.fail("action_post raised UserError even though all fields are filled")
