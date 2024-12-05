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

function caesarCipherDecryption(cipherText, key) {
  let plainText = [];

  for (let letter of cipherText) {
    let index = alpha.indexOf(letter.toLowerCase());
    if (index !== -1) {
      let newIndex = (index - key) % 27;
      if (newIndex < 0) newIndex += 27;

      plainText.push(alpha[newIndex]);
    } else {
      plainText.push(letter);
    }
  }
  return plainText.join("");
}

function encryptionSelection(content, key, iterationCount) {
  if (iterationCount > 1) {
    // ReDecryption Cipher Text
    for (let i = 1; i <= Number(iterationCount); i++) {
      plainTextField.value = caesarCipherDecryption(
        plainTextField.value,
        Number(key)
      );
    }
  } else {
    plainTextField.value = caesarCipherDecryption(content, Number(key));
  }
}

// Run Encryption Function While User Type
encryptedTextField.oninput = () => {
  encryptionSelection(
    encryptedTextField.value,
    caesarKey.value,
    caesarIterationCount.value
  );
};

// ReEncryption When Change Key
caesarKey.oninput = () => {
  encryptionSelection(
    encryptedTextField.value,
    caesarKey.value,
    caesarIterationCount.value
  );
};

// ReEncryption When Change Iteration Count
caesarIterationCount.oninput = () => {
  encryptionSelection(
    encryptedTextField.value,
    caesarKey.value,
    caesarIterationCount.value
  );
};
