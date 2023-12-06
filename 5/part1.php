<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Extract the first line and split it into seeds
$seedsLine = array_shift($lines);
$seeds = array_map('intval', explode(' ', substr($seedsLine, 7)));

$skipNumbers = [];

foreach ($lines as $line) {
  if (substr($line, -4) === 'map:') {
    // New category
    $skipNumbers = [];
    continue;
  }
  
  [$destination, $source, $length] = array_map('intval', explode(' ', $line));
  
  foreach ($seeds as $index => $seed) {
    if ($seed >= $source && $seed < $source + $length && !isset($skipNumbers[$seed])) {
      $newSeed = $seed - $source + $destination;
      $skipNumbers[$newSeed] = true;
      $seeds[$index] = $newSeed;
    }
  }
}

echo min($seeds);
?>