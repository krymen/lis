const initializeIntermediateComputations = () => ({
  lastIndexBySubsequenceLength: new Map(),
  predecessorsByIndex: new Map(),
  longestSubsequenceLength: 0,

  updateSubsequenceLengthWithIndex: function(length, index) {
    this.predecessorsByIndex.set(index, this.lastIndexBySubsequenceLength.get(length - 1));
    this.lastIndexBySubsequenceLength.set(length, index);
    this.longestSubsequenceLength = Math.max(length, this.longestSubsequenceLength);
  },

  lastIndexOfLongestSubsequence: function() {
    return this.lastIndexBySubsequenceLength.get(this.longestSubsequenceLength);
  },

  getPredecessor: function(index) {
    return this.predecessorsByIndex.get(index);
  },

  getLastIndex: function(length) {
    return this.lastIndexBySubsequenceLength.get(length);
  }
});

const binarySearch = (left, right, isOnTheRight) => {
  if (left > right) {
    return left;
  }

  const middle = Math.ceil((left + right) / 2);

  return isOnTheRight(middle)
    ? binarySearch(middle + 1, right, isOnTheRight)
    : binarySearch(left, middle - 1, isOnTheRight);
};

const findLongestPossibleSubsequenceLengthFor = (element, intermediateComputations, inputSequence) =>
  binarySearch(
    1,
    intermediateComputations.longestSubsequenceLength,
    length => inputSequence[intermediateComputations.getLastIndex(length)] < element
  );

const reconstructLongestSubsequence = (intermediateComputations, inputSequence) => {
  const longestSubsequence = new Array(intermediateComputations.longestSubsequenceLength);

  let lastIndex = intermediateComputations.lastIndexOfLongestSubsequence();

  for (index = intermediateComputations.longestSubsequenceLength - 1; index > -1; index--) {
    longestSubsequence[index] = inputSequence[lastIndex];
    lastIndex = intermediateComputations.getPredecessor(lastIndex);
  }

  return longestSubsequence;
};

const longestIncreasingSubsequence = inputSequence => {
  if (!Array.isArray(inputSequence)) {
    throw TypeError('Expected array as an argument.');
  }

  const intermediateComputations = initializeIntermediateComputations();

  inputSequence.forEach((element, index) => {
    if (typeof element !== 'number') {
      return;
    }

    const longestPossibleSubsequenceLength = findLongestPossibleSubsequenceLengthFor(
      element,
      intermediateComputations,
      inputSequence
    );

    intermediateComputations.updateSubsequenceLengthWithIndex(longestPossibleSubsequenceLength, index);
  });

  return reconstructLongestSubsequence(intermediateComputations, inputSequence);
};

module.exports = longestIncreasingSubsequence;
