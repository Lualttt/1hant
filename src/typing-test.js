const test_text = document.getElementById("test-text");
const test_type = document.getElementById("test-type");

testNewSentence();

function testKey(key) {
    if (key === "\n") {
        testNewSentence();
    } else if (key === "Backspace") {
        if (test_type.innerHTML.slice(-1) === ">") {
            test_type.innerHTML = test_type.innerHTML.slice(0, -28);
        } else {
            test_type.innerHTML = test_type.innerHTML.slice(0, -1);
        }
        
        return;
    }
    
    let letter = test_text.innerText.slice(test_type.innerText.length, test_type.innerText.length + 1);
    if (key === letter) {
        test_type.innerHTML += key;
    } else {
        test_type.innerHTML += `<span class="wrong">${key}</span>`;
    }
}

function testNewSentence() {
    test_text.innerText = generate_sentence(10, true, true);
    test_type.innerText = "";
}