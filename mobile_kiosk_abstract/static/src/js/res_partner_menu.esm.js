/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

const rpc = registry.category("services").get("rpc");

export class ResPartnerMenu extends Component {
    setup() {
        this.state = useState({ partners: [] });

        onWillStart(async () => {
            const companyId = this.env.services.session.company_id;
            const result = await rpc("/web/dataset/search_read", {
                model: "res.partner",
                domain: [["company_id", "=", companyId]],
                fields: ["name", "email"],
            });
            this.state.partners = result;
        });
    }
}

ResPartnerMenu.template = "mobile_kiosk_abstract.ResPartnerMenu";
