let alpha = [
  " ",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let plainTextField = document.querySelector("#plain-text");
let encryptedTextField = document.querySelector("#encrypted-text");
let caesarKey = document.querySelector(".encryption-key input");

function vigenèreTableEncryption(plainText, keyWord) {
  let cipherText = [];
  let key = keyWord.repeat(Math.ceil(plainText.length / keyWord.length));
  key = key.slice(0, plainText.length);

  let filterPlainText = plainText.toLowerCase();

  let keyIndexes = [];
  let plainTexIndexes = [];

  for (let i = 0; i < filterPlainText.length; i++) {
    let plainIndex = alpha.indexOf(filterPlainText[i]);
    let keyIndex = alpha.indexOf(key[i].toLowerCase());

    if (plainIndex !== -1 && keyIndex !== -1) {
      plainTexIndexes.push(plainIndex);
      keyIndexes.push(keyIndex);
    } else {
      cipherText.push(filterPlainText[i]);
    }
  }

  for (let i = 0; i < plainTexIndexes.length; i++) {
    let cipherIndex = (plainTexIndexes[i] + keyIndexes[i]) % 27;
    cipherText.push(alpha[cipherIndex]);
  }

  return cipherText.join("");
}
function encryptionSelection(content, key, iterationCount) {
  encryptedTextField.value = vigenèreTableEncryption(content, key);
}

// Run Encryption Function While User Type
plainTextField.oninput = () => {
  encryptionSelection(plainTextField.value, caesarKey.value);
};

// ReEncryption When Change Key
caesarKey.oninput = () => {
  encryptionSelection(plainTextField.value, caesarKey.value);
};
