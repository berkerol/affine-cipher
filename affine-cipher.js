let digitsMul = 13;
let digitsAdd = 3;
let uppercaseMul = 17;
let uppercaseAdd = 5;
let lowercaseMul = 19;
let lowercaseAdd = 7;

document.getElementById('dmul').value = digitsMul;
document.getElementById('dadd').value = digitsAdd;
document.getElementById('umul').value = uppercaseMul;
document.getElementById('uadd').value = uppercaseAdd;
document.getElementById('lmul').value = lowercaseMul;
document.getElementById('ladd').value = lowercaseAdd;

window.save = function () {
  digitsMul = +document.getElementById('dmul').value;
  digitsAdd = +document.getElementById('dadd').value;
  uppercaseMul = +document.getElementById('umul').value;
  uppercaseAdd = +document.getElementById('uadd').value;
  lowercaseMul = +document.getElementById('lmul').value;
  lowercaseAdd = +document.getElementById('ladd').value;
};

window.encipherText = function () {
  const plaintext = document.getElementById('text').value;
  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext.charCodeAt(i);
    if (char >= 48 && char <= 57) {
      ciphertext += String.fromCharCode(encipher(char, 48, 10, digitsMul, digitsAdd));
    } else if (char >= 65 && char <= 90) {
      ciphertext += String.fromCharCode(encipher(char, 65, 26, uppercaseMul, uppercaseAdd));
    } else if (char >= 97 && char <= 122) {
      ciphertext += String.fromCharCode(encipher(char, 97, 26, lowercaseMul, lowercaseAdd));
    } else {
      ciphertext += String.fromCharCode(char);
    }
  }
  document.getElementById('text').value = ciphertext;
};

window.decipherText = function () {
  const ciphertext = document.getElementById('text').value;
  let plaintext = '';
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext.charCodeAt(i);
    if (char >= 48 && char <= 57) {
      plaintext += String.fromCharCode(decipher(char, 48, 10, digitsMul, digitsAdd));
    } else if (char >= 65 && char <= 90) {
      plaintext += String.fromCharCode(decipher(char, 65, 26, uppercaseMul, uppercaseAdd));
    } else if (char >= 97 && char <= 122) {
      plaintext += String.fromCharCode(decipher(char, 97, 26, lowercaseMul, lowercaseAdd));
    } else {
      plaintext += String.fromCharCode(char);
    }
  }
  document.getElementById('text').value = plaintext;
};

function encipher (char, alphabetBeginning, alphabetLength, coefficient, constant) {
  return (((char - alphabetBeginning) * coefficient + constant) % alphabetLength) + alphabetBeginning;
}

function decipher (char, alphabetBeginning, alphabetLength, coefficient, constant) {
  let i = char - alphabetBeginning - constant;
  while (i < 0) {
    i += alphabetLength;
  }
  while (i % coefficient !== 0) {
    i += alphabetLength;
  }
  return i / coefficient + alphabetBeginning;
}
