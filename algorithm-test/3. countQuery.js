function countQuery(input, query) {
  return query.map((queryItem) => {
    return input.filter((inputItem) => inputItem === queryItem).length;
  });
}

const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];
const output = countQuery(input, query);
console.log(output);
