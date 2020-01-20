/* global createButtonGroup createModalButton createModal keyUpHandler */
const defaultDigitsMul = 13;
const defaultDigitsAdd = 3;
const defaultUppercaseMul = 17;
const defaultUppercaseAdd = 5;
const defaultLowercaseMul = 19;
const defaultLowercaseAdd = 7;
let digitsMul;
let digitsAdd;
let uppercaseMul;
let uppercaseAdd;
let lowercaseMul;
let lowercaseAdd;

const modalElements = [[['Multiplicative key for digits', 'dmul', 1, 99999, 'number'], ['Multiplicative key for uppercase', 'umul', 1, 99999, 'number'], ['Multiplicative key for lowercase', 'lmul', 1, 99999, 'number']], [['Additive key for digits', 'dadd', 1, 99999, 'number'], ['Additive key for uppercase', 'uadd', 1, 99999, 'number'], ['Additive key for lowercase', 'ladd', 1, 99999, 'number']]];
const buttonElements = [['success', 'convert(encipher)', 'e', 'lock', '<u>E</u>ncrypt'], ['info', '', 's', 'cog', '<u>S</u>ettings'], ['primary', 'convert(decipher)', 'd', 'unlock', '<u>D</u>ecrypt']];
const buttonGroup = createButtonGroup('btn-group btn-group-lg btn-group-center mt-3', buttonElements);
document.getElementsByClassName('container')[0].appendChild(createModalButton(buttonGroup, 1));
createModal(modalElements);
resetInputs();
document.addEventListener('keyup', keyUpHandler);

function resetInputs () {
  digitsMul = defaultDigitsMul;
  digitsAdd = defaultDigitsAdd;
  uppercaseMul = defaultUppercaseMul;
  uppercaseAdd = defaultUppercaseAdd;
  lowercaseMul = defaultLowercaseMul;
  lowercaseAdd = defaultLowercaseAdd;
  document.getElementById('dmul').value = digitsMul;
  document.getElementById('dadd').value = digitsAdd;
  document.getElementById('umul').value = uppercaseMul;
  document.getElementById('uadd').value = uppercaseAdd;
  document.getElementById('lmul').value = lowercaseMul;
  document.getElementById('ladd').value = lowercaseAdd;
}

window.save = function () {
  digitsMul = +document.getElementById('dmul').value;
  digitsAdd = +document.getElementById('dadd').value;
  uppercaseMul = +document.getElementById('umul').value;
  uppercaseAdd = +document.getElementById('uadd').value;
  lowercaseMul = +document.getElementById('lmul').value;
  lowercaseAdd = +document.getElementById('ladd').value;
};

window.convert = function (func) {
  const original = document.getElementById('text').value;
  let converted = '';
  for (let i = 0; i < original.length; i++) {
    const char = original.charCodeAt(i);
    if (char >= 48 && char <= 57) {
      converted += String.fromCharCode(func(char, 48, 10, digitsMul, digitsAdd));
    } else if (char >= 65 && char <= 90) {
      converted += String.fromCharCode(func(char, 65, 26, uppercaseMul, uppercaseAdd));
    } else if (char >= 97 && char <= 122) {
      converted += String.fromCharCode(func(char, 97, 26, lowercaseMul, lowercaseAdd));
    } else {
      converted += String.fromCharCode(char);
    }
  }
  document.getElementById('text').value = converted;
};

window.encipher = function (char, alphabetBeginning, alphabetLength, coefficient, constant) {
  return (((char - alphabetBeginning) * coefficient + constant) % alphabetLength) + alphabetBeginning;
};

window.decipher = function (char, alphabetBeginning, alphabetLength, coefficient, constant) {
  let i = char - alphabetBeginning - constant;
  while (i < 0) {
    i += alphabetLength;
  }
  while (i % coefficient !== 0) {
    i += alphabetLength;
  }
  return i / coefficient + alphabetBeginning;
};
