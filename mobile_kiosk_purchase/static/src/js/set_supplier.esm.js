/** @odoo-module **/


import { registry } from "@web/core/registry";
import { _t } from "web.core";
import { ActionMobileKioskPurchase } from "@mobile_kiosk_purchase/js/purchase_action.esm";
import { ResPartnerMenu } from "@mobile_kiosk_abstract/js/res_partner_menu.esm";
import { useService } from "@web/core/utils/hooks";

export class ActionSetSupplier extends ActionMobileKioskPurchase {

    setup() {
        this.actionService = useService("action");
    }

    // Méthode appelée lors du clic sur le bouton "Skip Partner"
/*    _onSkipPartner() {
        this.trigger('do-action', {
            type: 'ir.actions.client',
            name: _t('Select Product'),
            tag: "mobile_kiosk_purchase_action_set_product",
            kiosk_context: this.kiosk_context,
        });
    }
*/
    _onListPartners() {
        this.actionService.doAction("mobile_kiosk_abstract.action_res_partner_kanban", {
            type: "ir.actions.client",
            tag: "mobile_kiosk_purchase_action_set_supplier",
            additional_context:{
                kiosk_context: this.kiosk_context,
                kiosk_next_tag: "mobile_kiosk_purchase_action_set_product",
                kiosk_extra_fields: {
                    partner_name: "display_name",
                    partner_id: "id",
                },
            },
        });
    }
}

ActionSetSupplier.template = "mobile_kiosk_purchase.MobileAppPurchaseSetSupplier";

registry.category("actions").add("mobile_kiosk_purchase_action_set_supplier", (env, action) => {
    return {
        type: "ir.actions.act_window",
        res_model: "res.partner",
        view_mode: "kanban",
        views: [[false, "kanban"]],
        context: {
            ...action.context,
        },
    };
});


// Copyright (C) 2020-Today GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
