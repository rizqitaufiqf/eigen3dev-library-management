function diffDiagonalMatrix(matrix) {
  let firstDiagonal = 0;
  let valFirstDiagonal = [];
  let secondDiagonal = 0;
  let valSecondDiagonal = [];

  for (let i = 0; i < matrix.length; i++) {
    valFirstDiagonal.push(matrix[i][i]);
    firstDiagonal += matrix[i][i];

    valSecondDiagonal.push(matrix[i][matrix.length - i - 1]);
    secondDiagonal += matrix[i][matrix.length - i - 1];
  }

  console.log(`diagonal pertama = ${valFirstDiagonal.join(" + ")} = ${firstDiagonal}`);
  console.log(`diagonal kedua = ${valSecondDiagonal.join(" + ")} = ${secondDiagonal}`);
  return `maka hasilnya adalah ${firstDiagonal} - ${secondDiagonal} = ${
    firstDiagonal - secondDiagonal
  }`;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const result = diffDiagonalMatrix(matrix);
console.log(result);
