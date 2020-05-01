====================
POS Load Done Orders
====================

.. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   !! This file is generated by oca-gen-addon-readme !!
   !! changes will be overwritten.                   !!
   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

.. |badge1| image:: https://img.shields.io/badge/maturity-Beta-yellow.png
    :target: https://odoo-community.org/page/development-status
    :alt: Beta
.. |badge2| image:: https://img.shields.io/badge/licence-AGPL--3-blue.png
    :target: http://www.gnu.org/licenses/agpl-3.0-standalone.html
    :alt: License: AGPL-3
.. |badge3| image:: https://img.shields.io/badge/github-grap%2Fgrap--odoo--incubator-lightgray.png?logo=github
    :target: https://github.com/grap/grap-odoo-incubator/tree/8.0/pos_done_order_load
    :alt: grap/grap-odoo-incubator

|badge1| |badge2| |badge3| 

This module extends the functionality of point of sale to allow you to
load again a done PoS Order in the point of sale to make extra operation on it.

For the time being, only the reprint of the bill is allowed.

**Table of contents**

.. contents::
   :local:

Configuration
=============

To configure this module, you need to:

* Go to Point of Sale / Configuration / Point of Sale
* check the box Load Done Orders
* Optionnaly, change the value of the max done orders to load field.

.. figure:: https://raw.githubusercontent.com/grap/grap-odoo-incubator/8.0/pos_done_order_load/static/description/pos_config_form.png

Usage
=====

To use this module, you need to:

* Launch the point of sale

* Click on the new button 'Load Done Orders'

.. figure:: https://raw.githubusercontent.com/grap/grap-odoo-incubator/8.0/pos_done_order_load/static/description/pos_load_done_order_button.png

* the list of the last previous done orders are displayed.

* You can perform a research by name or PoS Reference field in the search box

* At the end of the line, buttons are available to make extra actions

.. figure:: https://raw.githubusercontent.com/grap/grap-odoo-incubator/8.0/pos_done_order_load/static/description/pos_done_order_list.png

Known issues / Roadmap
======================

* For a reason of cached data, it is only possible to reprint an order of
  the current session. Printing older orders could be possible if we load
  previous statements.

* It could be great to add an other button 'Refund' to create an refund order
  directly in the Point of Sale.

* It could be great to add an other button 'Invoice' to create have the
  possibility to reedit the invoice.

**Migration Note**

For more recent version, please use OCA modules. (``pos_order_return``,
``pos_order_mgmt``)

Bug Tracker
===========

Bugs are tracked on `GitHub Issues <https://github.com/grap/grap-odoo-incubator/issues>`_.
In case of trouble, please check there if your issue has already been reported.
If you spotted it first, help us smashing it by providing a detailed and welcomed
`feedback <https://github.com/grap/grap-odoo-incubator/issues/new?body=module:%20pos_done_order_load%0Aversion:%208.0%0A%0A**Steps%20to%20reproduce**%0A-%20...%0A%0A**Current%20behavior**%0A%0A**Expected%20behavior**>`_.

Do not contact contributors directly about support or help with technical issues.

Credits
=======

Authors
~~~~~~~

* GRAP

Contributors
~~~~~~~~~~~~

* Sylvain LE GAL <https://twitter.com/legalsylvain>

Maintainers
~~~~~~~~~~~



This module is part of the `grap/grap-odoo-incubator <https://github.com/grap/grap-odoo-incubator/tree/8.0/pos_done_order_load>`_ project on GitHub.


You are welcome to contribute.