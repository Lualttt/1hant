const text_input = document.getElementById("text-input");
const trans_select = document.getElementById("translation-selection");
const punct_oneshot = document.getElementById("punct-oneshot");
const special_oneshot = document.getElementById("special-oneshot");
const modifier_oneshot = document.getElementById("modifier-oneshot");
const space_return = document.getElementById("space-return");
const switch_llk = document.getElementById("switch-llk");
const punctuation = document.getElementById("punctuation");
const numbers = document.getElementById("numbers");
const special = document.getElementById("special");
const capitalization = document.getElementById("capitalization");

document.addEventListener("chord", chordHandler);
text_input.addEventListener("keydown", inputKeyDown);
text_input.addEventListener("keyup", inputKeyUp);
trans_select.addEventListener("change", () => { translation = translation_presets[trans_select.value]; });
punct_oneshot.addEventListener("change", () => { chord_settings.punct_oneshot = punct_oneshot.checked; });
special_oneshot.addEventListener("change", () => { chord_settings.special_oneshot = special_oneshot.checked; });
modifier_oneshot.addEventListener("change", () => { chord_settings.modifier_oneshot = modifier_oneshot.value; });
space_return.addEventListener("change", () => { chord_settings.space_return = space_return.checked; });
switch_llk.addEventListener("change", () => { chord_settings.switch_llk = switch_llk.checked; });
punctuation.addEventListener("change", () => { test_settings.punctuation = punctuation.checked; testNewSentence(); });
numbers.addEventListener("change", () => { test_settings.numbers = numbers.checked; testNewSentence(); });
special.addEventListener("change", () => { test_settings.special = special.checked; testNewSentence(); });
capitalization.addEventListener("change", () => { test_settings.capitalization = capitalization.checked; testNewSentence(); });

translation = translation_presets[trans_select.value];
chord_settings.punct_oneshot = punct_oneshot.checked;
chord_settings.special_oneshot = special_oneshot.checked;
chord_settings.modifier_oneshot = modifier_oneshot.value;
chord_settings.space_return = space_return.checked;
chord_settings.switch_llk = switch_llk.checked;
test_settings.punctuation = punctuation.checked;
test_settings.numbers = numbers.checked;
test_settings.special = special.checked;
test_settings.capitalization = capitalization.checked;
testNewSentence();

function chordHandler(e) {
    const key = e.detail.key;

    testKey(key);

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
