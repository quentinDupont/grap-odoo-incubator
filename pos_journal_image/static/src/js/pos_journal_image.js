/*
Copyright (C) 2019-Today GRAP (http://www.grap.coop)
@author: Sylvain LE GAL (https://twitter.com/legalsylvain)
License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
*/

// "use strict";

// odoo.pos_journal_image = function(instance){
//     var module = instance.point_of_sale;

//     module.PosBaseWidget.include({
//         journal_icon_url: function(id){
//             console.log("============ ID" + id);
//             return '/web/binary/image?model=account.journal&id=' + id + '&field=pos_image';
//         },
//     });

// };

// TODO
perdu je sais pas trop comment faire que le xml appelle la fonction en v12..
à creuser p-e du coté des PR pos 
ou voir si ya eu la mig en 9.0 ou 10.0 etc..

odoo.define('point_of_sale.pos_journal_image', function(require) {
    "use strict";

    var models = require('point_of_sale.models');

    models.PosBaseWidget = models.PosBaseWidget.extend({
        journal_icon_url: function(id){
            console.log("============ ID" + id);
            return '/web/binary/image?model=account.journal&id=' + id + '&field=pos_image';
        },
    });

});
