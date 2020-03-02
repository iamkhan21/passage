export function phraseJustification(phrase, width) {
  let words;
  [words, width] = prepareText(phrase);
  return justify(words, width > 12 ? width : 12);
}

function prepareText(phrase) {
  const words = phrase.split(" ");
  const width = Math.max(...words.map(word => word.length));

  return [words, width];
}

function calcBadness(line, width) {
  const diff = width - line.length;
  if (diff >= 0) {
    return Math.pow(width - line.length, 2);
  }
  return Number.MAX_VALUE;
}

function justify(words, width) {
  const memo = [];
  let length = words.length;
  memo[length] = [0, 0];

  for (let i = length - 1; i >= 0; i--) {
    let best = [Number.MAX_VALUE, i + 1];
    for (let j = i + 1; j <= length; j++) {
      const totalScore =
        calcBadness(words.slice(i, j).join(" "), width) + memo[j][0];
      if (totalScore < best[0]) {
        best = [totalScore, j];
      }
    }
    memo[i] = best;
  }

  let pointer = 0;
  const results = [];
  while (pointer < length) {
    const line = words.slice(pointer, memo[pointer][1]).join(" ");
    results.push(line);
    [, pointer] = memo[pointer];
  }
  return results;
}
