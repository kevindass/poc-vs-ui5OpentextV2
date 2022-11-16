sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("opentext.controller.View1", {
            onInit: function () {
                
            //POST: Get token with Auth
                var that = this;
                var OTCSTICKET;
                var form = new FormData();
                var oEntry = {};

                var oJSONModel = new sap.ui.model.json.JSONModel(oEntry);
			    this.getView().setModel(oJSONModel, "data");	

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
                    console.log("Call to OpenText: successful");
                    console.log(response);
                    const token = JSON.parse(response);
                    that.OTCSTICKET = token.ticket
                    //POST: Get data with token
                    var aData = jQuery.ajax({
                        type: "GET",
                        contentType: "application/json",
                        url: "/cs/cs.exe/api/v1/webreports/79132?format=webreport",
                        dataType: "json",
                        "headers": {
                            "OTCSTICKET":  that.OTCSTICKET
                        },
                        async: false,
                        success: function (data, textStatus, jqXHR) {
                        console.log("success to GET+ Open Text");
                        // var oModel = new sap.ui.model.json.JSONModel();
                        // oModel.setData(data);
                        oJSONModel = new sap.ui.model.json.JSONModel(data.myRows);
					    that.getView().setModel(oJSONModel, "otData");
                        }
                    });
                });

            }
        });
    });
