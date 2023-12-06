<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Define function to check if a character is a digit
function is_digit_code($char) {
  return ctype_digit($char);
}

$sum = 0;

foreach ($lines as $line) {
  $digits = ['', ''];
  
  foreach (str_split($line) as $currentChar) {
    if (is_digit_code($currentChar)) {
      if ($digits[0] === '') {
        $digits[0] = $currentChar;
        $digits[1] = $currentChar;
      } else {
        $digits[1] = $currentChar;
      }
    }
  }
  
  // Sum the numbers
  $sum += intval(join('', $digits));
}

echo $sum;
?>