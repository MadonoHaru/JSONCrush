"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////////////////////////////////////////////////
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
///////////////////////////////////////////////////////////////////////
var JSONCrushSwap_1 = require("./JSONCrushSwap");
function JSONUncrush(string) {
    // string must be a decoded URI component, searchParams.get() does this automatically
    // unsplit the string
    var splitString = string.split("\u0001");
    // JSUncrush algorithm
    var a = splitString[0];
    var b = splitString[1];
    for (var c in b.split("")) {
        var d = a.split(b[c]);
        a = d.join(d.pop());
    }
    // unswap the json characters in reverse direction
    return JSONCrushSwap_1.JSONCrushSwap(a, !!0);
}
exports.JSONUncrush = JSONUncrush;
