/** @odoo-module **/

/* import { _t } from "web.core";
import { useService } from "@web/core/utils/hooks";


export function kiosk_update_context_from_result(context, result) {
    Object.keys(result).forEach(function (key) {
        if (key !== "status" && key !== "messages") {
            context[key] = result[key];
        }
    });
}

export function kiosk_warn_connexion() {
    const notificationService = useService("notification");
    console.log("================ ICI")
    const close = notificationService.add("I will be quickly closed");
    setTimeout(close, 1000);
    /*
    const notificationService = useService("notification");
    notificationService.add(
        _t("Connection lost"),
        {
            type: "danger",
            message: _t("Please check your Internet Connection, then try again"),
        }
    );
}

export function kiosk_notify_result(result) {
    const notificationService = useService("notification");
    const messages = result.messages || [];
    messages.forEach((message) => {
        if (message.level === "error") {
            notificationService.add(message.title, { type: "danger", message: message.message });
        } else {
            notificationService.add(message.title, { type: "success", message: message.message });
        }
    });
}
*/


import { patch } from "@web/core/utils/patch";
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

patch(Component.prototype, "mobile_kiosk_abstract.widget", {

    kiosk_warn_connexion() {
        const notification = this.env.services.notification;
        notification.add(
            _t("Connexion lost"),
            {
                type: "danger",
                message: _t("Please check your Internet Connection, then try again"),
            }
        );
    },

    kiosk_notify_result(result) {
        const notification = this.env.services.notification;
        const messages = result.messages || [];

        messages.forEach(function (message) {
            notification.add(message.message, {
                type: message.level === "error" ? "danger" : "success",
                title: message.title,
            });
        });
    },

    kiosk_update_context_from_result(context, result) {
        Object.keys(result).forEach(function (key) {
            if (key !== "status" && key !== "messages") {
                context[key] = result[key];
            }
        });
    },

});
