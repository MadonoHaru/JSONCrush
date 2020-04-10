"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////////////////////////////////////////////////
// JSONCrush by Frank Force [MIT] https://github.com/KilledByAPixel/JSONCrush
// Based on JSCrush - Javascript crusher by @aivopaas. [MIT] http://www.iteral.com/jscrush
///////////////////////////////////////////////////////////////////////
var JSONCrushSwap_1 = require("./JSONCrushSwap");
function JSONCrush(string) {
    var JSCrush = function (string, characters) {
        // JSCrush Algorithm (remove repeated substrings)
        var ByteLength = function (string) {
            return encodeURI(string).replace(/%../g, "i").length;
        };
        var maxSubstringLength = 50; // speed it up by limiting max length
        var o = {};
        var X, O, m, i, N, M, t, j, R;
        var c;
        var e;
        var Q = characters;
        var x;
        var s = string;
        X = 1;
        m = "";
        while (true) {
            for (M = N = e = c = 0, i = Q.length; !c && i--;)
                !~s.indexOf(Q[i]) && (c = Q[i]);
            if (!c)
                break;
            if (O) {
                o = {};
                for (x in O)
                    for (j = s.indexOf(x), o[x] = 0; ~j; o[x]++)
                        j = s.indexOf(x, j + x.length);
                O = o;
            }
            else
                for (O = o = {}, t = 1; X && t < maxSubstringLength; t++)
                    for (X = i = 0; ++i < s.length - t;)
                        if (!o[(x = s.substr((j = i), t))])
                            if (~(j = s.indexOf(x, j + t)))
                                for (X = t, o[x] = 1; ~j; o[x]++)
                                    j = s.indexOf(x, j + t);
            for (var x_1 in O) {
                j = ByteLength(x_1);
                if ((j = (R = O[x_1]) * j - j - (R + 1) * ByteLength(c)))
                    (j > M || (j == M && R > N)) && ((M = j), (N = R), (e = x_1));
                if (j < 1)
                    delete O[x_1];
            }
            o = {};
            for (var x_2 in O)
                o[x_2.split(e).join(c)] = 1;
            O = o;
            if (!e)
                break;
            s = s.split(e).join(c) + c + e;
            m = c + m;
        }
        return { a: s, b: m };
    };
    // remove \u0001 if it is found in the string so it can be used as a delimiter
    string = string.replace(/\u0001/g, "");
    // swap out common json characters
    string = JSONCrushSwap_1.JSONCrushSwap(string);
    // create a string of characters that will not be escaped by encodeURIComponent
    var characters = [];
    var unescapedCharacters = "-_.!~*'()";
    for (var i = 127; --i;) {
        if ((i >= 48 && i <= 57) || // 0-9
            (i >= 65 && i <= 90) || // A-Z
            (i >= 97 && i <= 122) || // a-z
            unescapedCharacters.includes(String.fromCharCode(i)))
            characters.push(String.fromCharCode(i));
    }
    // check if every character is used
    var allUsed = true;
    for (var i in characters) {
        var c = characters[i];
        if (!string.includes(c)) {
            allUsed = false;
            break;
        }
    }
    if (allUsed) {
        // use extended set if all the unescaped ones are used
        for (var i = 2; i < 255; ++i) {
            var c = String.fromCharCode(i);
            if (c != "\\" && !characters.includes(c))
                characters.unshift(c);
        }
    }
    // crush with JS crush
    var crushed = JSCrush(string, characters);
    // use \u0001 as a delimiter between JSCrush parts
    var crushedString = crushed.a + "\u0001" + crushed.b;
    // encode URI
    return encodeURIComponent(crushedString);
}
exports.JSONCrush = JSONCrush;
