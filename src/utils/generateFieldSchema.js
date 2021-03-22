"use strict";
exports.__esModule = true;
var field_modifiers_1 = require("../field-modifiers");
var generateFieldSchema = function (name, type, modifiers) {
    if (modifiers === void 0) { modifiers = {}; }
    var res = name + " " + type;
    for (var _i = 0, _a = Object.entries(modifiers); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        var modifier = key;
        if (value) {
            res = field_modifiers_1["default"][modifier](res);
        }
    }
    return res;
};
exports["default"] = generateFieldSchema;
