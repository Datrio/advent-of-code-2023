<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

// Create an array filled with 1s where we can keep track of number of cards
$cardCount = array_fill(0, count($lines), 1);

$index = 0; // Initialize an index counter
$numberOfCards = 0; // Initialize the total number of cards

foreach ($lines as $game) {
  [$gameInfo, $gameData] = explode(': ', $game);
  [$winningNumbers, $gameNumbers] = array_map('trim', explode(' | ', $gameData));
  
  // Split and sort numbers
  $winningNumbersArray = preg_split('/\s+/', $winningNumbers);
  sort($winningNumbersArray);
  $gameNumbersArray = preg_split('/\s+/', $gameNumbers);
  sort($gameNumbersArray);
  
  // Convert the array to an associative array for lookup
  $gameNumbersAssoc = array_flip($gameNumbersArray);
  
  // Calculate the score
  $score = array_reduce($winningNumbersArray, function($sum, $number) use ($gameNumbersAssoc) {
    return isset($gameNumbersAssoc[$number]) ? $sum + 1 : $sum;
  }, 0);
  
  // Increase the number of next cards
  for ($k = 1; $k <= $score; $k++) {
    if (isset($cardCount[$index + $k])) {
      $cardCount[$index + $k] += $cardCount[$index];
    }
  }
  
  $numberOfCards += $cardCount[$index];
  $index++; // Increment the index for the next iteration
}

echo $numberOfCards;