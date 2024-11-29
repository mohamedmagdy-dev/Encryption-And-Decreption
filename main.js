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
  "z"
];

// Caesar Cipher Encryption
function caesarCipherEncryption(plainText, key) {
  let cipherText = [];
  for (letter of plainText) {
    for (let i = 0; i < alpha.length; i++) {
      if (alpha[i].toLowerCase() == letter.toLowerCase()) {
        if (i >= 23 && key == 3) {
          cipherText.push(alpha[(i + key) % 27]);
        } else {
          cipherText.push(alpha[i + key]);
        }
      }
    }
  }
  return cipherText.join("").toLowerCase();
}

// Test Case For Encryption

// Test 1
console.log("%c----- Test Case One For Encryption With Space And Key Is 3 -----","color:red;font-size: 18px")
console.log("Encryption Text Is: " + `%c${caesarCipherEncryption("meet me after the toga party", 3)}`,"color:green");

// Test 2 
console.log("%c----- Test Case Two For Encryption With Space And Key Is 4 -----","color:red;font-size: 18px")
console.log("Encryption Text Is: " + `%c${caesarCipherEncryption("meet me after the toga party", 4)}`,"color:green");



// Caesar Cipher Decryption
function caesarCipherDecryption(cipherText, key) {
  let plainText = [];
  for (letter of cipherText) {
    for (let i = 0; i < alpha.length; i++) {
      if (alpha[i].toLowerCase() == letter.toLowerCase()) {
        if (i >= 23 && key == 3) {
          plainText.push(alpha[(i - key) % 27]);
        } else {
          plainText.push(alpha[i - key]);
        }
      }
    }
  }
  return plainText.join("").toLowerCase();
}

// Test Case For Decryption

// Test 1
console.log("%c----- Test Case One For Decryption With Key Is 3 -----","color:red;font-size: 18px")
console.log("Decryption Text Is: " + `%c${caesarCipherDecryption("phhwcphcdiwhucwkhcwrjdcsduwa", 3)}`,"color:green");

// Test 2 
console.log("%c----- Test Case Two For Decryption With Key Is 4 -----","color:red;font-size: 18px")
console.log("Decryption Text Is: " + `%c${caesarCipherDecryption("qiixdqidejxivdxlidxskedtevx", 4)}`,"color:green");



// -------------------------------------------------------------------------------------------

function playFairCipherEncryption(plainText, keyWord) {
  // let matrix1 = ['m', 'o', 'n', 'a', 'r'];
  // let matrix2 = ['b', 'c', 'd', 'e', 'f'];
  // let matrix3 = ['g', 'h', 'i/j', 'k','l'];
  // let matrix4 = ['p', 'q', 's', 't', 'u'];
  // let matrix5 = ['v', 'w', 'x', 'y', 'z'];

  let matrix = ["", "", "", "", ""];

  // Remove Duplicate Letter From Keyword
  let filterKeyword = [...new Set(keyWord.toLowerCase())].join("");

  // To Fill Matrix
  for (let i = 0; i < filterKeyword.length; i++) {
    matrix[i] = filterKeyword[i];
  }

  // Filter Alpha (Remove Keyword Letter From letter Array)
  let filterAlpha = alpha.filter((letter) => {
    if (!filterKeyword.includes(letter)) {
      return letter;
    }
  });

  // Add All Remaining Letters
  matrix = matrix.concat(...filterAlpha);

  // Separate Keyword
  let stashKeyword = [...keyWord];
  let separateKeyword = [];

  for (let i = 0; i < keyWord.length; i++) {
    if (i == keyWord.length - 1) {
      separateKeyword.push([stashKeyword[i], stashKeyword[i]]);
    } else {
      separateKeyword.push([stashKeyword[i], stashKeyword[i + 1]]);
    }
  }
  console.log(matrix);
  console.log(separateKeyword);
}

// playFairCipherEncryption("", "Ballon");

// -------------------------------------------------------------------------------------------

function vigenèreTableEncryption(plainText, keyWord = "text") {
  let cipherText = [];
  let key = keyWord.repeat(plainText.length);
  let filterPlainText = plainText;

  key = key.slice(0, filterPlainText.length);

  let keyIndexes = [];
  let plainTexIndexes = [];

  // Get Key And PlainText Letters Indexes
  for (let i = 0; i < filterPlainText.length; i++) {
    plainTexIndexes.push(alpha.indexOf(filterPlainText[i]));
    keyIndexes.push(alpha.indexOf(key[i]));
  }

  // Now We Will Get Cipher Text
  for (let i = 0; i < plainTexIndexes.length; i++) {
    cipherText.push(alpha[((plainTexIndexes[i] + keyIndexes[i])) % 27]);
  }

  return cipherText.join("");
}
// Test Case For Encryption

// Test 1
console.log("%c----- Test Case One For Decryption With keyWord Is 'text' -----","color:yellow;font-size: 18px")
console.log("Encryption Text Is: " + `%c${vigenèreTableEncryption("we are discovered save yourself", "text")}`,"color:green");



function vigenèreTableDecryption(cipherText, keyWord = "text") {
  let plainText = [];
  let key = keyWord.repeat(cipherText.length);
  key = key.slice(0, cipherText.length);

  let keyIndexes = [];
  let CipherTextIndexes = [];

  // Get Key And CipherText Letters Indexes
  for (let i = 0; i < cipherText.length; i++) {
    CipherTextIndexes.push(alpha.indexOf(cipherText[i]));
    keyIndexes.push(alpha.indexOf(key[i]));
  }

  // Now We Will Get Plain Text
  for (let i = 0; i < CipherTextIndexes.length; i++) {
    if ((CipherTextIndexes[i] - keyIndexes[i]) < 0) {
      plainText.push(alpha[(CipherTextIndexes[i] - keyIndexes[i]) + 27]);
    } else {
      plainText.push(alpha[(CipherTextIndexes[i] - keyIndexes[i])]);
    }
  }

  return plainText.join("");
}

// Test Case For Decryption

// Test 1
console.log("%c----- Test Case One For Decryption With keyWord Is 'text' -----","color:yellow;font-size: 18px")
console.log("Decryption Text Is: " + `%c${vigenèreTableDecryption("pjxukjxxbx hojoyxepuojxrhzolyqc", "text")}`,"color:green");

// -------------------------------------------------------------------------------------------
console.log("-------------------------------------------------------------------------------------------")


function transpositionEncryption(plainText,key) {
  let cipherText = [];
  let splitPlainText = []
  let indexesOfKeys = []

  let counter1 = 0
  let counter2 = key.length

  for(let i = 0; i < Math.ceil(plainText.length / key.length) ; i++) {
    splitPlainText.push(plainText.slice(counter1,counter2))
    counter1 +=7
    counter2 +=7
  }

  for(let i = 1; i <= key.length ; i++) {
    indexesOfKeys.push(key.indexOf(i))
  }

  for(index of indexesOfKeys) {
    for(let z = 0; z < splitPlainText.length ; z++) {
      if(splitPlainText[z][index] == undefined) {
        continue
      } else {
        cipherText.push(splitPlainText[z][index])
      }
    }
  }

  return cipherText.join("")
}

function transpositionDecryption(cipherText, key) {
  let numRows = Math.ceil(cipherText.length / key.length);
  let numCols = key.length; 
  let splitCipherText = Array.from({ length: numCols }, () => []);
  let indexesOfKeys = []; 


  for (let i = 1; i <= key.length; i++) {
    indexesOfKeys.push(key.indexOf(i));
  }


  let cipherIndex = 0;
  for (let col of indexesOfKeys) {
    let numCharsInCol = cipherIndex + numRows <= cipherText.length ? numRows : cipherText.length - cipherIndex;
    splitCipherText[col] = cipherText.slice(cipherIndex, cipherIndex + numCharsInCol).split("");
    cipherIndex += numCharsInCol;
  }


  let plainText = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (splitCipherText[j][i] !== undefined) {
        plainText.push(splitCipherText[j][i]);
      }
    }
  }

  return plainText.join("");
}



console.log(transpositionEncryption("duckcodD","4312567"));
console.log(transpositionDecryption("ckudDcods",[4,3,1,2,5,6,7]));

// عندي مشكله في فك التشفير و ال playfire