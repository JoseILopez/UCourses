//----------------------------
//    COMMON UTILITIES
//----------------------------

// Replaces spaces with dashes

function processTitle(title) {
  return title.split(' ').join("-");
}

// Handles the response data and sends accordingly.

function handleResponse(res, data) {
  if (Number.isInteger(data)) {
    res.sendStatus(data);
    return;
  }

  res.send(data);
}

// Returns an array with no duplicates

function uniqueArray(arr) {
  newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

// Returns true if it only contains alphanumeric chars and spaces

function isAlphaNumWithSpaces(text) {
  if (text.match(/^[\w\s]+$/)) {
    return true;
  }

  return false;
}


module.exports = { processTitle, handleResponse, uniqueArray, isAlphaNumWithSpaces };
