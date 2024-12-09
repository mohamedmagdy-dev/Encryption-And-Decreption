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

function caesarCipherEncryption(plainText, key) {
  let cipherText = [];

  for (let letter of plainText) {
    let index = alpha.indexOf(letter.toLowerCase());
    if (index !== -1) {
      cipherText.push(alpha[(index + key) % 27]);
    } else {
      cipherText.push(letter);
    }
  }

  return cipherText.join("");
}

function encryptionSelection(content, key, iterationCount) {
  if (iterationCount > 1) {
    // ReEncryption Cipher Text
    for (let i = 1; i <= Number(iterationCount); i++) {
      encryptedTextField.value = caesarCipherEncryption(
        encryptedTextField.value,
        Number(key)
      );
    }
  } else {
    encryptedTextField.value = caesarCipherEncryption(content, Number(key));
  }
}

// Run Encryption Function While User Type
plainTextField.oninput = () => {
  encryptionSelection(
    plainTextField.value,
    caesarKey.value,
    caesarIterationCount.value
  );
};

// ReEncryption When Change Key
caesarKey.oninput = () => {
  encryptionSelection(
    plainTextField.value,
    caesarKey.value,
    caesarIterationCount.value
  );
};

// ReEncryption When Change Iteration Count
caesarIterationCount.oninput = () => {
  if (encryptedTextField.value !== "") {
    encryptionSelection(
      encryptedTextField.value,
      caesarKey.value,
      caesarIterationCount.value
    );
  } else {
    caesarIterationCount.value = 1;
  }
};
