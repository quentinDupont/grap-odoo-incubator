/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { KanbanRecord } from "@web/views/kanban/kanban_record";
import { useService } from "@web/core/utils/hooks";

// Import des fonctions utilitaires
import { kiosk_notify_result, kiosk_update_context_from_result, kiosk_warn_connexion } from "./widget.esm";

patch(KanbanRecord.prototype, "mobile_kiosk_abstract.kanban_view_handler", {

    setup() {
        this._super(...arguments);
        this.actionService = useService("action");
    },

    // Overload this function to create a custom hook
    // Should return a promise that returns a dict that will be added to the returned
    async _mobileOpenRecordHook() {
        // Ensure to call the original method
        return await this._super(...arguments) || { status: "ok" };
    },

    async onGlobalClick(ev) {
        if (ev.currentTarget.closest(".mobile_kiosk_mode")) {
            const context = this.props.record.context;
            const kiosk_context = context.kiosk_context || {};
            const fields = context.kiosk_extra_fields || {};
            // Populate the kiosk_context with extra fields
            Object.keys(fields).forEach((key) => {
                kiosk_context[key] = this.props.record.data[fields[key]];
            });

            try {
                console.log("=============== ABSTRACT == dans onGlobalClick du purchase avant le recordHook");
                let result = await this._mobileOpenRecordHook();
                console.log("=============== ABSTRACT == dans onGlobalClick du purchase APRES le recordHook");

                /*kiosk_notify_result(result);*/

                if (result.status === "ok") {
                    kiosk_update_context_from_result(kiosk_context, result);
                    this.actionService.doAction({
                        type: "ir.actions.client",
                        name: "Confirm",
                        tag: context.kiosk_next_tag,
                        kiosk_context: kiosk_context,
                    });

                }
            } catch (error) {
                console.log("============== ERREUR DANS onGlobalClick ABSTRATC")
                /*kiosk_warn_connexion();*/
            }

        } else {
            // Call the original onGlobalClick method
            return this._super(ev);
        }
    },
});
