/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { KanbanRecord } from "@web/views/kanban/kanban_record";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

patch(KanbanRecord.prototype, "mobile_kiosk_abstract.kanban_view_handler", {

    setup() {
        this._super(...arguments);
        this.actionService = useService("action");

        /* new registry*/
/*        const mobileKioskRegistry = registry.category("mobile_kiosk");
        const sharedContext = mobileKioskRegistry.get("shared_context") || {};*/

/*        this.kiosk_context = sharedContext.kiosk_context || {};
        this.kiosk_extra_fields = sharedContext.kiosk_extra_fields || {};
        this.kiosk_next_tag = sharedContext.kiosk_next_tag;

        console.log("🔍 Contexte récupéré depuis registry :", {
            context: this.kiosk_context,
            fields: this.kiosk_extra_fields,
            next: this.kiosk_next_tag,
        });*/
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

            try {
                console.log("=============== ABSTRACT == dans onGlobalClick du purchase avant le recordHook");
                let result = await this._mobileOpenRecordHook();
                console.log("=============== ABSTRACT == dans onGlobalClick du purchase APRES le recordHook");

                this.kiosk_notify_result(result);

                if (result.status === "ok") {   
                    console.log("=============== ABSTRACT == Result OK");
                    this.kiosk_update_context_from_result(kiosk_context, result);
                    console.log("TAG:", context.kiosk_next_tag);

                    // ✅ Passage complet de tous les éléments nécessaires à l'action suivante
                    this.actionService.doAction({
                        type: "ir.actions.client",
                        name: "Confirm",
                        tag: context.kiosk_next_tag,
                        // Props passés au prochain composant OWL
                        kiosk_context: kiosk_context,
                        kiosk_extra_fields: context.kiosk_extra_fields,
                        kiosk_next_tag: context.kiosk_next_tag,
                    });
                }
            } catch (error) {
                console.log("============== ERREUR DANS onGlobalClick ABSTRATC")
                this.kiosk_warn_connexion();
            }

        } else {
            // Call the original onGlobalClick method
            return this._super(ev);
        }
    },
});
