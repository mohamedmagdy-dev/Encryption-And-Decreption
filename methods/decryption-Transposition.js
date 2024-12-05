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

function transpositionDecryption(cipherText, key) {
  let numColumns = key.length;
  let numRows = Math.ceil(cipherText.length / numColumns);

  let keyOrder = key.split("").map((num) => parseInt(num) - 1);

  let grid = Array.from({ length: numRows }, () => Array(numColumns).fill(""));

  let counter = 0;
  for (let col of keyOrder) {
    for (let row = 0; row < numRows; row++) {
      grid[row][col] = cipherText[counter++];
    }
  }

  let plainText = "";
  for (let row = 0; row < numRows; row++) {
    plainText += grid[row].join("");
  }

  return plainText.trim();
}

function encryptionSelection(content, key, iterationCount) {
  if (iterationCount > 1) {
    // ReDecryption Cipher Text
    for (let i = 1; i <= Number(iterationCount); i++) {
      plainTextField.value = transpositionDecryption(plainTextField.value, key);
    }
  } else {
    plainTextField.value = transpositionDecryption(content, key);
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
