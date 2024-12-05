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

function playFairCipherDecryption(cipherText, keyWord) {
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

  // تجهيز المصفوفة (الماتريكس) بنفس طريقة التشفير
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
  matrix = matrix.slice(0, 25); // المصفوفة 5×5

  // فك التشفير
  let plainText = [];

  // تقسيم النص المشفر إلى أزواج
  for (let i = 0; i < cipherText.length; i += 2) {
    let firstLetter = cipherText[i];
    let secondLetter = cipherText[i + 1];

    let firstIndex = matrix.indexOf(firstLetter);
    let secondIndex = matrix.indexOf(secondLetter);

    let firstRow = Math.floor(firstIndex / 5);
    let firstCol = firstIndex % 5;

    let secondRow = Math.floor(secondIndex / 5);
    let secondCol = secondIndex % 5;

    // فك التشفير
    if (firstRow === secondRow) {
      firstCol = (firstCol + 4) % 5; // التحريك للخلف في نفس الصف
      secondCol = (secondCol + 4) % 5;
    } else if (firstCol === secondCol) {
      firstRow = (firstRow + 4) % 5; // التحريك للخلف في نفس العمود
      secondRow = (secondRow + 4) % 5;
    } else {
      // تبادل الأعمدة في الصفوف المختلفة
      let tempCol = firstCol;
      firstCol = secondCol;
      secondCol = tempCol;
    }

    plainText.push(matrix[firstRow * 5 + firstCol]);
    plainText.push(matrix[secondRow * 5 + secondCol]);
  }

  return plainText.join("").replace(/x(?=\w|$)/g, ""); // إزالة حروف "x" الزائدة التي قد تكون أُضيفت في التشفير
}

function encryptionSelection(content, key) {
  plainTextField.value = playFairCipherDecryption(content, key);
}

// Run Encryption Function While User Type
encryptedTextField.oninput = () => {
  encryptionSelection(encryptedTextField.value, caesarKey.value);
};

// ReEncryption When Change Key
caesarKey.oninput = () => {
  encryptionSelection(encryptedTextField.value, caesarKey.value);
};
