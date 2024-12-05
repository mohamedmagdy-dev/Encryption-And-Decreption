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
let caesarIterationCount = document.querySelector(".iteration-count input");

function vigenèreTableDecryption(cipherText, keyWord) {
  let plainText = [];
  let key = keyWord.repeat(cipherText.length);
  key = key.slice(0, cipherText.length);

  let keyIndexes = [];
  let CipherTextIndexes = [];

  for (let i = 0; i < cipherText.length; i++) {
    CipherTextIndexes.push(alpha.indexOf(cipherText[i]));
    keyIndexes.push(alpha.indexOf(key[i]));
  }

  for (let i = 0; i < CipherTextIndexes.length; i++) {
    if (CipherTextIndexes[i] - keyIndexes[i] < 0) {
      plainText.push(alpha[CipherTextIndexes[i] - keyIndexes[i] + 27]);
    } else {
      plainText.push(alpha[CipherTextIndexes[i] - keyIndexes[i]]);
    }
  }

  return plainText.join("");
}

function encryptionSelection(content, key) {
  plainTextField.value = vigenèreTableDecryption(content, key);
}

// Run Encryption Function While User Type
encryptedTextField.oninput = () => {
  encryptionSelection(encryptedTextField.value, caesarKey.value);
};

// ReEncryption When Change Key
caesarKey.oninput = () => {
  encryptionSelection(encryptedTextField.value, caesarKey.value);
};
