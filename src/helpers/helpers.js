// src/helpers/helpers.js

/**
 * Truncates a string to a specified length, adding an ellipsis if truncated.
 * @param {string} str - The input string.
 * @param {number} num - The maximum length of the string before truncation.
 * @returns {string} The truncated string.
 */
export const truncate = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
