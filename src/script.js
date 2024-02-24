const input = document.getElementById("input");
const translation_selection = document.getElementById("translation-selection");
const tt_text = document.getElementById("tt-text");
const tt_type = document.getElementById("tt-type");
const keyboard = document.getElementById("keyboard");
const space_return = document.getElementById("space-return");
const punctuation_checkbox = document.getElementById("punctuation");
const numbers_checkbox = document.getElementById("numbers");

const chord_time_ms = 35;
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
const chords = {
    global: {
        " ": " ", // Space
        " ,e": "Backspace",
        " ,h": "\n", // Enter

        " ,s": "LayerText",
        " ,t": "LayerPunctuation",
        " ,r": "LayerNumber"
    },
    text: {
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
    }
};

let translation = {
    a: "i",
    s: "e",
    d: "a",
    f: "h",
    q: "n",
    w: "r",
    e: "t",
    r: "s"
};
let layer = "text";
let chord = [];

input.addEventListener("keydown", keypress);
translation_selection.addEventListener("change", update_layout);
punctuation_checkbox.addEventListener("change", reset_typing_test);
numbers_checkbox.addEventListener("change", reset_typing_test);

update_layout();
reset_typing_test();

function keypress(e) {
    e.preventDefault();
    
    let key = translation[e.key];
    if (key === undefined) { return; }
    
    if (chord.length === 0) {
        setTimeout(send_key, chord_time_ms);
    }
    
    document.getElementById(`key-${key.replace(" ", "thumb")}`).classList.add("pressed");
    setTimeout(() => {
        document.getElementById(`key-${key.replace(" ", "thumb")}`).classList.remove("pressed");
    }, chord_time_ms + 50);

    chord.push(key);
}

function send_key() {
    if (chord.length === 1 && layer === "text") {
        input.value += chord[0];

        type_check(chord[0]);

        chord = [];
        return;
    }
    
    // sorting by alphabetical order means every chord will have the same order
    // and making it into a string its easy to find a chord like a,h in the dict
    chord = chord.sort().toString();
    
    let pre_global = layer;

    if (!(chord in chords[layer])) {
        if (!(chord) in chords["global"]) {
            chord = [];
            return;
        }

        layer = "global";
    }
    
    let key = chords[layer][chord];
    layer = pre_global;

    if (key === undefined) {
        chord = [];
        return;
    }

    // Oneshot layers to return back to text
    if (layer === "punctuation") { layer = "text"; }
    
    if (key === "Backspace") {
        input.value = input.value.slice(0, -1);
        type_check("Backspace");
    } else if (key === "LayerText") {
        layer = "text";
    } else if (key === "LayerPunctuation") {
        layer = "punctuation";
    } else if (key === "LayerNumber") {
        layer = "number";
    } else {
        input.value += key;
        type_check(key);
    }

    if (key === " " && space_return.checked) {
        layer = "text";
    }

    chord = [];
}

function update_layout() {
    let translation_selected = translation_selection.value;

    if (translation_selected.includes("right")) {
        keyboard.classList.add("right");
    } else {
        keyboard.classList.remove("right");
    }

    translation = {};
    translation = translation_presets[translation_selected];
}

function type_check(key) {
    if (key === "\n") {
        reset_typing_test();
        return;
    }
    else if (key === "Backspace") {
        if (tt_type.innerHTML.slice(-1) === ">") {
            tt_type.innerHTML = tt_type.innerHTML.slice(0, -28);
        } else {
            tt_type.innerHTML = tt_type.innerHTML.slice(0, -1);
        }

        return;
    }

    let letter = tt_text.innerText.slice(tt_type.innerText.length, tt_type.innerText.length + 1);

    if (key === letter) {
        tt_type.innerHTML += key;
    } else {
        tt_type.innerHTML += `<span class="wrong">${key}</span>`;
    }
}

function reset_typing_test() {
    tt_text.innerText = generate_sentence(10, punctuation_checkbox.checked, numbers_checkbox.checked);
    tt_type.innerText = "";
}