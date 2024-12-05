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

function transpositionEncryption(plainText, key) {
  let numColumns = key.length;
  let numRows = Math.ceil(plainText.length / numColumns);

  while (plainText.length < numColumns * numRows) {
    plainText += "X";
  }

  let grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(plainText.slice(i * numColumns, (i + 1) * numColumns).split(""));
  }

  let keyOrder = key.split("").map((num) => parseInt(num) - 1);

  let cipherText = "";
  for (let col of keyOrder) {
    for (let row = 0; row < numRows; row++) {
      cipherText += grid[row][col];
    }
  }

  return cipherText;
}

function encryptionSelection(content, key, iterationCount) {
  if (iterationCount > 1) {
    // ReEncryption Cipher Text
    for (let i = 1; i <= Number(iterationCount); i++) {
      encryptedTextField.value = transpositionEncryption(
        encryptedTextField.value,
        key
      );
    }
  } else {
    encryptedTextField.value = transpositionEncryption(content, key);
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
  encryptionSelection(
    plainTextField.value,
    caesarKey.value,
    caesarIterationCount.value
  );
};
