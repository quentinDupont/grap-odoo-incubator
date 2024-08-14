/** @odoo-module **/

// Copyright (C) 2020-Today GRAP (http://www.grap.coop)
// @author: Sylvain LE GAL (https://twitter.com/legalsylvain)
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";
import { ActionMobileKioskPurchase } from "@mobile_kiosk_purchase/js/purchase_action.esm";
import { useService } from "@web/core/utils/hooks";

export class ActionSetQuantity extends ActionMobileKioskPurchase {

    setup() {
        super.setup();
        this.orm = useService("orm");
        this.notification = useService("notification");
        this.action = useService("action");
        this.kiosk_context = this.props.context.kiosk_context;
    }

    // Event handlers
    async onClickAddQuantity(ev) {
        const quantity = parseFloat(this.numpad_widget.get_input_value(), 10);

        if (isNaN(quantity)) {
            this.notification.add(
                _t("Incorrect value"),
                { type: "danger", message: _t("Please enter a valid quantity.") }
            );
        } else {
            try {
                const result = await this.orm.call("mobile.kiosk.purchase", "add_quantity", [
                    this.kiosk_context.purchase_order_id,
                    this.kiosk_context.product_id,
                    quantity,
                ]);
                
                this.kiosk_notify_result(result);

                if (result.status === "ok") {
                    if (this.kiosk_context.partner_id === undefined) {
                        // Reset context if no partner selected
                        this.kiosk_context = {
                            partner_name: undefined,
                            purchase_order_id: undefined,
                            purchase_order_name: undefined,
                            supplierinfo_price: undefined,
                            supplierinfo_min_qty: undefined,
                            supplierinfo_uom_po_id: undefined,
                            supplierinfo_uom_po_name: undefined,
                            supplierinfo_multiplier_qty: undefined,
                        };
                    }

                    // Trigger the next action
                    this.action.doAction({
                        type: "ir.actions.client",
                        name: "Select Product",
                        tag: "mobile_kiosk_purchase_action_set_product",
                        kiosk_context: this.kiosk_context,
                    });
                }
            } catch (error) {
                this.kiosk_warn_connexion();
            }
        }
    }

    // Helper functions (these should be imported from a shared utility file)
    kiosk_notify_result(result) {
        const messages = result.messages || [];
        messages.forEach((message) => {
            if (message.level === "error") {
                this.notification.add(message.title, { type: "danger", message: message.message });
            } else {
                this.notification.add(message.title, { type: "info", message: message.message });
            }
        });
    }

    kiosk_warn_connexion() {
        this.notification.add(
            _t("Connection lost"),
            { type: "danger", message: _t("Please check your Internet connection and try again.") }
        );
    }
}

ActionSetQuantity.template = "mobile_kiosk_purchase.ActionSetQuantity";
registry.category("actions").add("mobile_kiosk_purchase_action_set_quantity", ActionSetQuantity);


/* ==================== */





/*
odoo.define('mobile_kiosk_purchase.set_quantity', function (require) {
    "use strict";

    var ActionMobileKioskPurchase = require("mobile_kiosk_purchase.purchase_action");
    var core = require('web.core');
    var _t = core._t;

    var ActionSetQuantity = ActionMobileKioskPurchase.extend({
        template: "MobileAppPurchaseSetQuantity",

        _kiosk_required_fields: [
            "partner_name",
            "purchase_order_id",
            "purchase_order_name",
            "product_id",
            "product_name",
        ],

        _kiosk_pad_widget_required: true,

        events: {
            "click .button_add_quantity": function () {
                var self = this;
                var quantity = parseFloat(this.numpad_widget.get_input_value(), 10);
                if (isNaN(quantity)) {
                    self.do_warn(
                        _t("Incorrect value"),
                        _t("Please enter a valid quantity."),
                        false,
                    );
                } else {
                    this._rpc({
                        model: 'mobile.kiosk.purchase',
                        method: 'add_quantity',
                        args: [
                            self.kiosk_context.purchase_order_id,
                            self.kiosk_context.product_id,
                            quantity,
                        ],
                    })
                        .then(function (result) {
                            self.kiosk_notify_result(result);
                            if (result.status === "ok") {
                                if (self.kiosk_context.partner_id === undefined) {
                                    // If we don't have any partner selected,
                                    // we reset the value that has been defined by the
                                    // selection of a product
                                    self.kiosk_context.partner_name = undefined;
                                    self.kiosk_context.purchase_order_id = undefined;
                                    self.kiosk_context.purchase_order_name = undefined;
                                    self.kiosk_context.supplierinfo_price = undefined;
                                    self.kiosk_context.supplierinfo_min_qty = undefined;
                                    self.kiosk_context.supplierinfo_uom_po_id =
                                        undefined;
                                    self.kiosk_context.supplierinfo_uom_po_name =
                                        undefined;
                                    self.kiosk_context.supplierinfo_multiplier_qty =
                                        undefined;
                                }
                                // Return to the product page
                                self.do_action({
                                    type: 'ir.actions.client',
                                    name: 'Select Product',
                                    tag: "mobile_kiosk_purchase_action_set_product",
                                    kiosk_context: self.kiosk_context,
                                });
                            }
                        }, function () {
                            self.kiosk_warn_connexion();
                        });
                }
            },
        },

    });

    core.action_registry.add(
        'mobile_kiosk_purchase_action_set_quantity',
        ActionSetQuantity,
    );

    return ActionSetQuantity;

});*/
