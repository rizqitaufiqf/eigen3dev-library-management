function longestString(str) {
  const texts = str.split(" ");

  let longestText = texts[0];

  for (let i = 0; i < texts.length; i++) {
    if (texts[i].length > longestText.length) {
      longestText = texts[i];
    }
  }

  return `${longestText}: ${longestText.length} character`;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const result = longestString(sentence);
console.log(result);
