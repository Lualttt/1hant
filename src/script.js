const text_input = document.getElementById("text-input");
const translation_selection = document.getElementById("translation-selection");
const tt_text = document.getElementById("tt-text");
const tt_type = document.getElementById("tt-type");
const keyboard = document.getElementById("keyboard");
const space_return = document.getElementById("space-return");
const punctuation_checkbox = document.getElementById("punctuation");
const numbers_checkbox = document.getElementById("numbers");

document.addEventListener("chord", chordHandler);
text_input.addEventListener("keydown", inputKeyDown);
text_input.addEventListener("keyup", inputKeyUp);

translation_selection.addEventListener("change", update_layout);
punctuation_checkbox.addEventListener("change", reset_typing_test);
numbers_checkbox.addEventListener("change", reset_typing_test);

update_layout();
reset_typing_test();

function chordHandler(e) {
    const key = e.detail.key;

    if (key === "Backspace") {
        text_input.value = text_input.value.slice(0, -1);
        return;
    }

    text_input.value += key;
}

function inputKeyDown(e) {
    e.preventDefault();

    const key = translate(e.key);
    if (key === undefined) { return; }

    document.getElementById(`key-${key.replace(" ", "thumb")}`).classList.add("key-pressed");

    chordKeyDown(key);
}

function inputKeyUp(e) {
    e.preventDefault();

    const key = translate(e.key);
    if (key === undefined) { return; }

    document.getElementById(`key-${key.replace(" ", "thumb")}`).classList.remove("key-pressed");
    
    chordKeyUp(key);
}

function update_layout() {
    let translation_selected = translation_selection.value;

    if (translation_selected.includes("right")) {
        keyboard.classList.add("right");
    } else {
        keyboard.classList.remove("right");
    }

//    translation = {};
//    translation = translation_presets[translation_selected];
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