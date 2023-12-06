<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

$result = array_reduce($lines, function($totalScore, $game) {
  [$gameInfo, $gameData] = explode(': ', $game);
  [$winningNumbers, $gameNumbers] = array_map('trim', explode(' | ', $gameData));
  
  // Split the numbers
  $winningNumbersArray = preg_split('/\s+/', $winningNumbers);
  sort($winningNumbersArray);
  $gameNumbersArray = preg_split('/\s+/', $gameNumbers);
  sort($gameNumbersArray);
  
  // Convert the array to an associative array for lookup
  $gameNumbersAssoc = array_flip($gameNumbersArray);
  
  // Calculate the score
  $score = array_reduce($winningNumbersArray, function($sum, $number) use ($gameNumbersAssoc) {
    if (isset($gameNumbersAssoc[$number])) {
      // If it's a winner, multiply by 2
      return !$sum ? 1 : $sum * 2;
    } else {
      return $sum;
    }
  }, 0);
  
  return $totalScore + $score;
}, 0);

echo $result;
