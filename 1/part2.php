<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Map of digit words to their corresponding numeric values
$mapDigits = [
  'one' => '1',
  'two' => '2',
  'three' => '3',
  'four' => '4',
  'five' => '5',
  'six' => '6',
  'seven' => '7',
  'eight' => '8',
  'nine' => '9',
  'zero' => '0'
];

// Function to map text to digit
function mapToDigit($text, $mapDigits) {
  return $mapDigits[$text] ?? $text;
}

// Regex pattern to match numbers and number words
$numberRegex = "/[0-9]|one|two|three|four|five|six|seven|eight|nine|zero/";

$sum = 0;

foreach ($lines as $line) {
  preg_match_all($numberRegex, $line, $matches);
  $numbers = $matches[0];
  
  $digitOne = mapToDigit($numbers[0], $mapDigits);
  $digitTwo = mapToDigit(end($numbers), $mapDigits);
  
  $sum += intval($digitOne . $digitTwo);
}

echo $sum;
?>