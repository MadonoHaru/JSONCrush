"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function JSONCrushSwap(string, forward) {
    if (forward === void 0) { forward = true; }
    // swap out characters for lesser used ones that wont get escaped
    var swapGroups = [
        ['"', "'"],
        ["':", "!"],
        [",'", "~"],
        ["}", ")", "\\", "\\"],
        ["{", "(", "\\", "\\"]
    ];
    function Swap(string, g) {
        var regex = new RegExp((g[2] ? g[2] : "") + g[0] + "|" + ((g[3] ? g[3] : "") + g[1]), "g");
        return string.replace(regex, function ($1) { return ($1 === g[0] ? g[1] : g[0]); });
    }
    // need to be able to swap characters in reverse direction for uncrush
    if (forward)
        for (var i = 0; i < swapGroups.length; ++i)
            string = Swap(string, swapGroups[i]);
    else
        for (var i = swapGroups.length; i--;)
            string = Swap(string, swapGroups[i]);
    return string;
}
exports.JSONCrushSwap = JSONCrushSwap;
