/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "opentext/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("opentext.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                //POST
                // const authData = new FormData();
                // authData.append("username","kdass");
                // authData.append("password", "Opentext@2022");
                // var bData = jQuery.ajax({
                //     //async: true,
                //     type: "POST",
                //     data: this.authData,
                //     cache: false,
                //     processData: false,
                //     //contentType: 'application/x-www-form-urlencoded',
                //     contentType: false,
                //     url: "/cs/cs.exe/api/v1/auth",
                //     success: function (data, textStatus, jqXHR){
                //         console.log("success POST + OpenText");
                //         console.log(data);
                //         console.log(textStatus);
                //     },
                //     error: function(oError){
                //         console.log('error', oError);
                //     }
                // });

                var form = new FormData();
                    form.append("username", "kdass");
                    form.append("password", "Opentext@2022");

                    var settings = {
                    "url": "/cs/cs.exe/api/v1/auth",
                    "method": "POST",
                    "timeout": 0,
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": form
                    };
                    $.ajax(settings).done(function (response) {
                        console.log(response);
                      });
            }
        });
    }
);