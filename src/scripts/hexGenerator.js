export const hexValues = [["0","f"],["8"],["4","c"],["2","6","a","d"],["1","3","5","7","9","b","e"]];


export const generateHexes = (s, n) => {
  const possibilities = [...Array(s+1).keys()].map((n)=>hexValues[n]).flat();
  let combinations = [];
  for (let i = 0; i < possibilities.length; i++) {
    for (let ii = 0; ii < possibilities.length; ii++) {
      for (let iii = 0; iii < possibilities.length; iii++) {
        combinations.push(possibilities[i]+possibilities[ii]+possibilities[iii])
      }
    }
  }
  // return `${possibilities[Math.floor(Math.random() * possibilities.length)]}${possibilities[Math.floor(Math.random() * possibilities.length)]}${possibilities[Math.floor(Math.random() * possibilities.length)]}`;
  return combinations.filter((h) => h !== "fff").sort(() => Math.random() - 0.5).slice(0,n);
}