// all chords must be in alphabetical order
// otherwise they wont be found
// example: a,h
const chords = {
    global: {
        " ": " ", // Space
        " ,e": "Backspace",
        " ,h": "\n", // Enter

        " ,s": "LayerText",
        " ,t": "LayerPunctuation",
        " ,r": "LayerNumber",
        " ,n": "LayerSpecial",
        " ,n,s": "LayerModifier",

        " ,i": "CloseEncapsulatingKey",
        " ,e,i": "LastLayeredKey"
    },
    text: {
        "n": "n",
        "r": "r",
        "t": "t",
        "s": "s",
        "i": "i",
        "e": "e",
        "a": "a",
        "h": "h",
        
        "a,h": "g",
        "e,i": "y",
        "n,r": "o",
        "s,t": "u",
        "r,t": "d",
        "a,e": "l",
        "h,i": "c",
        "n,s": "k",
        "h,t": "m",
        "h,r,t": "v",
        "e,h": "w",
        "a,i": "f",
        "r,s": "p",
        "n,t": "b",
        "a,e,h": "j",
        "r,s,t": "q",
        "a,e,i": "x",
        "n,r,t": "z"
    },
    punctuation: {
        "n": ";",
        "r": ":",
        "t": "'",
        "s": "\"",
        "i": "!",
        "e": "?",
        "a": ",",
        "h": "."
    },
    number: {
        "n": "5",
        "r": "6",
        "t": "7",
        "s": "8",
        "i": "1",
        "e": "2",
        "a": "3",
        "h": "4",

        "e,i": "0",
        "a,h": "9"
    },
    special: {
        "n": "/",
        "r": "*",
        "t": "-",
        "s": "+",
        "i": "_",
        "e": "(",
        "a": ")",
        "h": "&",

        "s,t": "=",
        "n,r": "@",
        "e,i": "#",
        "a,h": "%",
        "a,e": "$",
        "r,t": "~",
        "h,t": "`",
        "h,r,t": "^",
        "a,i": "{",
        "e,h": "}",
        "n,t": "[",
        "r,s": "]",
        "i,s": "<",
        "h,n": ">",
        "h,i": "|",
        "n,s": "\\"
    },
    modifier: {
        "n": "Alt",
        "r": "Control",
        "t": "HalfCapslock",
        "s": "Shift",
        "i": "Left",
        "e": "Up",
        "a": "Down",
        "h": "Right",

        "s,t": "FullCapslock",
        "n,r": "Escape",
        "e,i": "Home",
        "a,h": "End",
        "a,i": "PageDown",
        "e,h": "PageUp"
    }
};
const capsules = {
    "\"": "\"",
    "'": "'",
    "`": "`",

    "(": ")",
    "{": "}",
    "[": "]",
    "<": ">",

    ")": "(",
    "}": "{",
    "]": "[",
    ">": "<",
};

let chord_settings = {
    punct_oneshot: true, // if the punctuation layer is oneshot
    special_oneshot: true, // if the special characters layer is oneshot
    modifier_oneshot: "half", // how the oneshot on the modifier layer should act
    space_return: true, // should it return to the text layer when space is pressed
    switch_llk: false, // wether it should switch the chords for CEK and LLK
};
let current_layer = "text";
let current_chord = [];
let last_layered_key = "";
let last_capsule_key = "";
let capitalize_key = "";

function chordKeyDown(key) {
    if (current_chord.includes(key)) {
        chordPress(current_chord);

        return;
    }

    current_chord.push(key);
}

function chordKeyUp(key) {
    if (current_chord.length === 0) { return; }
    
    chordPress(current_chord);
    current_chord = [];
}

function chordPress(chord) {
    chord = chord.sort().toString();
    
    let key = chords[current_layer][chord];
    
    let from_global = false;
    if (chord in chords["global"]) {
        key = chords["global"][chord];
        from_global = true;
    }
    
    if (key === undefined) { return; }
    
    if (current_layer !== "text" && !from_global) {
        last_layered_key = key;
    }

    if (key in capsules) {
        last_capsule_key = key;
    }

    if (chord_settings.punct_oneshot && current_layer === "punctuation") { current_layer = "text"; }
    if (chord_settings.special_oneshot && current_layer === "special") { current_layer = "text"; }
    if (chord_settings.space_return && key === " ") { current_layer = "text"; }
    
    switch (chord_settings.modifier_oneshot) {
        case "half":
            if (!["Left", "Up", "Down", "Right"].includes(key)) {
                current_layer = "text";
            }
            break;
        case "full":
            current_layer = "text";
            break;
        default:
            break;
    }

    // it does the work ig
    if (!chord_settings.switch_llk) {
        if (key === "CloseEncapsulatingKey") {
            key = capsules[last_capsule_key];
            last_capsule_key = key;
        } else if (key === "LastLayeredKey") {
            key = last_layered_key;
        }
    } else {
        if (key === "CloseEncapsulatingKey") {
            key = last_layered_key;
        } else if (key === "LastLayeredKey") {
            key = capsules[last_capsule_key];
            last_capsule_key = key;
        }
    }

    // wow my code is garbage LOL
    if (key.length === 1) {
        if (capitalize_key === "Shift") {
            key = key.toUpperCase();
            capitalize_key = "";
        } else if (capitalize_key === "HalfCapslock") {
            key = key.toUpperCase();
            if (key === " ") { capitalize_key = ""; }
        } else if (capitalize_key === "FullCapslock") {
            key = key.toUpperCase();
        }
    }

    console.log(key, capitalize_key)    

    switch (key) {
        case "Shift":
            capitalize_key = "Shift";
            break;
        case "HalfCapslock":
            capitalize_key = capitalize_key === "HalfCapslock" ? "" : "HalfCapslock";
            break;
        case "FullCapslock":
            capitalize_key = capitalize_key === "FullCapslock" ? "" : "FullCapslock";
            break;

        case "LayerText":
            current_layer = "text"
            break;
        case "LayerPunctuation":
            current_layer = "punctuation";
            break;
        case "LayerNumber":
            current_layer = "number";
            break;
        case "LayerSpecial":
            current_layer = "special";
            break;
        case "LayerModifier":
            current_layer = "modifier";
            break;

        default:
            document.dispatchEvent(new CustomEvent("chord", { detail: { key: key } }));
            break;
    }
}