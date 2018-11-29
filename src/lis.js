const longestIncreasingSubsequence = inputSequence => {
  if (!Array.isArray(inputSequence)) {
    throw TypeError('Expected array as an argument.');
  }

  const P = new Array(1);
  const M = new Array(1);

  for (i = 0; i < inputSequence.length; i++) {
    let lo = 1;
    let hi = M.length - 1;

    while (lo <= hi) {
      let mid = Math.ceil((lo + hi) / 2);
      if (inputSequence[M[mid]] < inputSequence[i]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    const newL = lo;
    P[i] = M[newL - 1];
    M[newL] = i;
  }

  const lis = new Array(M.length - 1);
  let k = M[M.length - 1];

  for (i = M.length - 2; i > -1; i--) {
    lis[i] = inputSequence[k];
    k = P[k];
  }

  return lis;
};

module.exports = longestIncreasingSubsequence;
