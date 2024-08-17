function reverseStringKeepNumbers(str) {
  const letters = str.slice(0, str.length - 1);
  const numbers = str.slice(-1);

  const reversedLetters = letters.split("").reverse().join("");

  return reversedLetters + numbers;
}

const input = "NEGIE1";
const result = reverseStringKeepNumbers(input);
console.log(result);
