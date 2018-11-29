const binarySearch = (leftIndex, rightIndex, isOnTheRight) => {
  if (leftIndex > rightIndex) {
    return leftIndex;
  }

  const middle = Math.ceil((leftIndex + rightIndex) / 2);

  return isOnTheRight(middle)
    ? binarySearch(middle + 1, rightIndex, isOnTheRight)
    : binarySearch(leftIndex, middle - 1, isOnTheRight);
};

const findLongestPossibleSubsequenceLengthFor = (element, intermediateSubsequences, inputSequence) =>
  binarySearch(
    1,
    intermediateSubsequences.length - 1,
    index => inputSequence[intermediateSubsequences[index]] < element
  );

const reconstructLongestIncreasingSubsequence = (
  lastElementIndexBySubsequenceLength,
  predecessorsByIndex,
  inputSequence
) => {
  const longestIncreasingSubsequenceLength = lastElementIndexBySubsequenceLength.length - 1;
  const longestIncreasingSubsequence = new Array(longestIncreasingSubsequenceLength);

  let lastElementIndex = lastElementIndexBySubsequenceLength[longestIncreasingSubsequenceLength];

  for (index = longestIncreasingSubsequenceLength - 1; index > -1; index--) {
    longestIncreasingSubsequence[index] = inputSequence[lastElementIndex];
    lastElementIndex = predecessorsByIndex[lastElementIndex];
  }

  return longestIncreasingSubsequence;
};

const longestIncreasingSubsequence = inputSequence => {
  if (!Array.isArray(inputSequence)) {
    throw TypeError('Expected array as an argument.');
  }

  const lastElementIndexBySubsequenceLength = new Array(1);
  const predecessorsByIndex = new Array(1);

  inputSequence.forEach((element, index) => {
    const longestSubsequenceLength = findLongestPossibleSubsequenceLengthFor(
      element,
      lastElementIndexBySubsequenceLength,
      inputSequence
    );

    predecessorsByIndex[index] = lastElementIndexBySubsequenceLength[longestSubsequenceLength - 1];
    lastElementIndexBySubsequenceLength[longestSubsequenceLength] = index;
  });

  return reconstructLongestIncreasingSubsequence(
    lastElementIndexBySubsequenceLength,
    predecessorsByIndex,
    inputSequence
  );
};

module.exports = longestIncreasingSubsequence;
