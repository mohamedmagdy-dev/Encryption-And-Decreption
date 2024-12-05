

let plainTextField = document.querySelector("#plain-text");
let encryptedTextField = document.querySelector("#encrypted-text");
let caesarKey = document.querySelector(".encryption-key input");


function playFairCipherEncryption(plainText, keyWord) {
  const alpha = [
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

  let filterKeyword = [
    ...new Set(keyWord.toLowerCase().replace(/\s+/g, "")),
  ].join("");

  let matrix = [];

  for (let i = 0; i < filterKeyword.length; i++) {
    matrix.push(filterKeyword[i]);
  }

  let filterAlpha = alpha.filter((letter) => {
    return !filterKeyword.includes(letter);
  });

  matrix = matrix.concat(filterAlpha);

  matrix = matrix.slice(0, 25);

  let preparedText = plainText
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("");
  let separateKeyword = [];

  for (let i = 0; i < preparedText.length; i++) {
    if (
      i + 1 < preparedText.length &&
      preparedText[i] === preparedText[i + 1]
    ) {
      separateKeyword.push([preparedText[i], "x"]);
    } else if (i + 1 < preparedText.length) {
      separateKeyword.push([preparedText[i], preparedText[i + 1]]);
      i++;
    } else {
      separateKeyword.push([preparedText[i], "x"]);
    }
  }

  let cipherText = [];

  for (let pair of separateKeyword) {
    let firstLetter = pair[0];
    let secondLetter = pair[1];

    let firstIndex = matrix.indexOf(firstLetter);
    let secondIndex = matrix.indexOf(secondLetter);

    let firstRow = Math.floor(firstIndex / 5);
    let firstCol = firstIndex % 5;

    let secondRow = Math.floor(secondIndex / 5);
    let secondCol = secondIndex % 5;

    if (firstRow === secondRow) {
      firstCol = (firstCol + 1) % 5;
      secondCol = (secondCol + 1) % 5;
    } else if (firstCol === secondCol) {
      firstRow = (firstRow + 1) % 5;
      secondRow = (secondRow + 1) % 5;
    } else {
      let tempCol = firstCol;
      firstCol = secondCol;
      secondCol = tempCol;
    }

    cipherText.push(matrix[firstRow * 5 + firstCol]);
    cipherText.push(matrix[secondRow * 5 + secondCol]);
  }

  return cipherText.join("");
}

function encryptionSelection(content, key, iterationCount) {
  encryptedTextField.value = playFairCipherEncryption(content, key);
}

// Run Encryption Function While User Type
plainTextField.oninput = () => {
  encryptionSelection(plainTextField.value, caesarKey.value);
};

// ReEncryption When Change Key
caesarKey.oninput = () => {
  encryptionSelection(plainTextField.value, caesarKey.value);
};
