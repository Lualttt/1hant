const translation_presets = {
    "qwerty-left": {
        a: "i",
        s: "e",
        d: "a",
        f: "h",
        q: "n",
        w: "r",
        e: "t",
        r: "s",
        " ": " "
    },
    "qwerty-right": {
        ";": "i",
        l: "e",
        k: "a",
        j: "h",
        p: "n",
        o: "r",
        i: "t",
        u: "s",
        " ": " "
    },
    "graphite-left": {
        n: "i",
        r: "e",
        t: "a",
        s: "h",
        b: "n",
        l: "r",
        d: "t",
        w: "s",
        " ": " "
    },
    "graphite-right": {
        i: "i",
        e: "e",
        a: "a",
        h: "h",
        j: "n",
        u: "r",
        o: "t",
        f: "s",
        " ": " "
    },
    "none-left": {
        i: "i",
        e: "e",
        a: "a",
        h: "h",
        n: "n",
        r: "r",
        t: "t",
        s: "s",
        " ": " "
    },
    "none-right": {
        i: "i",
        e: "e",
        a: "a",
        h: "h",
        n: "n",
        r: "r",
        t: "t",
        s: "s",
        " ": " "
    }
};

let translation = translation_presets["qwerty-left"];

function translate(key) {
    return translation[key];
}