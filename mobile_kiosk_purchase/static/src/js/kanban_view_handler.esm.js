/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { KanbanRecord } from "@web/views/kanban/kanban_record";
import { useService } from "@web/core/utils/hooks";

// Import des fonctions utilitaires
import { kiosk_notify_result, kiosk_update_context_from_result, kiosk_warn_connexion } from "@mobile_kiosk_abstract/js/widget.esm";

patch(KanbanRecord.prototype, "mobile_kiosk_purchase.kanban_view_handler", {

    setup() {
        this._super(...arguments);
        this.notification = useService("notification");
        this.orm = useService("orm");
    },

    async _mobileOpenRecordHook() {
        const context = this.props.record.context;

        if (!context.kiosk_action) {
            return { status: "ok" };
        }

        try {
            let result;

            if (context.kiosk_action === "mobile_kiosk_purchase_select_supplier") {
                console.log("============== Dans SELECT_PARTNER")
                result = await this.orm.call(
                        "mobile.kiosk.purchase", "select_partner", 
                        [context.kiosk_context.partner_id]
                );

            } else if (context.kiosk_action === "mobile_kiosk_purchase_select_product") {
                result = await this.orm.call(
                        "mobile.kiosk.purchase", "select_product", 
                        [context.kiosk_context.partner_id, context.kiosk_context.product_id]
                );
                console.log("============== Dans SELECT_PRODUCT JS après résultat")
            }

            return result || { status: "ok" };

        } catch (error) {
            console.error("ORM Error:", error);
            throw error;
        }
    },

});
