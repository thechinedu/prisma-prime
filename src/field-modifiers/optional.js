"use strict";
exports.__esModule = true;
var optional = function (fieldSchema) {
    var _a = fieldSchema.split(' '), fieldName = _a[0], fieldType = _a[1];
    return fieldName + " " + fieldType + "?";
};
exports["default"] = optional;
