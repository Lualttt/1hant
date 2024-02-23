const input = document.getElementById("input");
const translation_selection = document.getElementById("translation-selection");
const tt_text = document.getElementById("tt-text");
const tt_type = document.getElementById("tt-type");

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
        r: "s"
    },
    "qwerty-right": {
        ";": "i",
        l: "e",
        k: "a",
        j: "h",
        p: "n",
        o: "r",
        i: "t",
        u: "s"
    },
    "graphite-left": {
        n: "i",
        r: "e",
        t: "a",
        s: "h",
        b: "n",
        l: "r",
        d: "t",
        w: "s"
    },
    "graphite-right": {
        i: "i",
        e: "e",
        a: "a",
        h: "h",
        j: "n",
        u: "r",
        o: "t",
        f: "s"
    },
    "none": {
        i: "i",
        e: "e",
        a: "a",
        h: "h",
        n: "n",
        r: "r",
        t: "t",
        s: "s"
    }
};
const chords = {
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
    "a,i": "w",
    "e,h": "f",
    "r,s": "p",
    "n,t": "b",
    "a,e,h": "j",
    "r,s,t": "q",
    "a,e,i": "x",
    "n,r,t": "z",
    
    "a,e,h,i": " ", // Space
    "n,r,s,t": "Backspace",
    "a,e,i,s": "\n" // Enter
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
let chord = [];

input.addEventListener("keydown", keypress);
translation_selection.addEventListener("change", update_layout);

update_layout();
reset_typing_test();

function keypress(e) {
    e.preventDefault();
    
    let key = translation[e.key];
    if (key === undefined) { return; }
    
    if (chord.length === 0) {
        setTimeout(sendkey, chord_time_ms);
    }
    
    chord.push(key);
}

function sendkey() {
    if (chord.length === 1) {
        input.value += chord[0];

        type_check(chord[0]);

        chord = [];
        return;
    }
    
    // sorting by alphabetical order means every chord will have the same order
    // and making it into a string its easy to find a chord like a,h in the dict
    chord = chord.sort().toString();
    
    if (!(chord in chords)) {
        chord = [];
        return;
    }
    
    let key = chords[chord];
    
    if (key === "Backspace") {
        input.value = input.value.slice(0, -1);
        type_check("Backspace");
    } else {
        input.value += key;
        type_check(key);
    }

    chord = [];
}

function update_layout() {
    let translation_selected = translation_selection.value;
    translation = {};
    translation = translation_presets[translation_selected];
}

function type_check(key) {
    if (key === "\n") {
        reset_typing_test();
        return;
    }
    else if (key === "Backspace") {
        if (tt_type.innerHTML.slice(-1) == ">") {
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
    tt_text.innerText = generate_sentence(10);
    tt_type.innerText = "";
}