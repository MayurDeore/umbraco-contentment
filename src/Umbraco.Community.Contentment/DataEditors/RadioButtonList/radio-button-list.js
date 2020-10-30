﻿/* Copyright © 2019 Lee Kelleher.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

angular.module("umbraco").controller("Umbraco.Community.Contentment.DataEditors.RadioButtonList.Controller", [
    "$scope",
    function ($scope) {

        // console.log("radiobuttonlist.model", $scope.model);

        var defaultConfig = {
            items: [],
            showDescriptions: 0,
            showIcons: 0,
            defaultValue: ""
        };
        var config = Object.assign({}, defaultConfig, $scope.model.config);

        var vm = this;

        function init() {
            $scope.model.value = $scope.model.value || config.defaultValue;

            if (Array.isArray($scope.model.value)) {
                $scope.model.value = $scope.model.value[0];
            }

            vm.groups = { "": [] };

            for (var i = 0; i < config.items.length; i++) {

                var item = config.items[i];

                if (item.hasOwnProperty("group") === false) {

                    // add to empty group
                    vm.groups[""].push(item);

                } else if (vm.groups.hasOwnProperty(item.group) === false) {

                    // add to new group
                    vm.groups[item.group] = [item];

                } else {

                    // add to existing group
                    vm.groups[item.group].push(item);

                }
            }

            vm.showDescriptions = Object.toBoolean(config.showDescriptions);
            vm.showIcons = Object.toBoolean(config.showIcons);

            vm.uniqueId = $scope.model.hasOwnProperty("dataTypeKey")
                ? [$scope.model.alias, $scope.model.dataTypeKey.substring(0, 8)].join("-")
                : $scope.model.alias;
        };

        init();
    }
]);
