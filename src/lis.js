const binarySearch = (leftIndex, rightIndex, isOnTheRight) => {
  if (leftIndex > rightIndex) {
    return leftIndex;
  }

  const middle = Math.ceil((leftIndex + rightIndex) / 2);

  return isOnTheRight(middle)
    ? binarySearch(middle + 1, rightIndex, isOnTheRight)
    : binarySearch(leftIndex, middle - 1, isOnTheRight);
};

const findLongestPossibleSubsequenceLengthFor = (element, intermediateComputations, inputSequence) =>
  binarySearch(
    1,
    intermediateComputations.longestIncreasingSubsequenceLength,
    index => inputSequence[intermediateComputations.lastElementIndexBySubsequenceLength[index]] < element
  );

const reconstructLongestIncreasingSubsequence = (intermediateComputations, inputSequence) => {
  const longestIncreasingSubsequence = new Array(intermediateComputations.longestIncreasingSubsequenceLength);

  let lastElementIndex = intermediateComputations.lastElementIndexOfLongestIncreasingSubsequence();

  for (index = intermediateComputations.longestIncreasingSubsequenceLength - 1; index > -1; index--) {
    longestIncreasingSubsequence[index] = inputSequence[lastElementIndex];
    lastElementIndex = intermediateComputations.predecessorsByIndex[lastElementIndex];
  }

  return longestIncreasingSubsequence;
};

const longestIncreasingSubsequence = inputSequence => {
  if (!Array.isArray(inputSequence)) {
    throw TypeError('Expected array as an argument.');
  }

  const intermediateComputations = {
    lastElementIndexBySubsequenceLength: new Array(1),
    predecessorsByIndex: new Array(1),
    longestIncreasingSubsequenceLength: 0,

    updateSubsequenceLengthWithIndex: function(length, index) {
      this.predecessorsByIndex[index] = this.lastElementIndexBySubsequenceLength[length - 1];
      this.lastElementIndexBySubsequenceLength[length] = index;
      this.longestIncreasingSubsequenceLength = Math.max(length, this.longestIncreasingSubsequenceLength);
    },

    lastElementIndexOfLongestIncreasingSubsequence: function() {
      return this.lastElementIndexBySubsequenceLength[this.longestIncreasingSubsequenceLength];
    }
  };

  inputSequence.forEach((element, index) => {
    const longestPossibleSubsequenceLength = findLongestPossibleSubsequenceLengthFor(
      element,
      intermediateComputations,
      inputSequence
    );

    intermediateComputations.updateSubsequenceLengthWithIndex(longestPossibleSubsequenceLength, index);
  });

  return reconstructLongestIncreasingSubsequence(intermediateComputations, inputSequence);
};

module.exports = longestIncreasingSubsequence;
