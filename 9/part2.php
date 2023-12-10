<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

$result = array_reduce($lines, function ($sum, $line) {
  $recalculatedLines = [array_map('intval', explode(' ', $line))];
  $newLine = [];
  $zeroCount = 0;
  
  do {
    $checkLine = end($recalculatedLines);
    $newLine = [];
    $zeroCount = 0;
    
    for ($i = 1; $i < count($checkLine); $i++) {
      $difference = $checkLine[$i] - $checkLine[$i - 1];
      $newLine[] = $difference;
      
      if ($difference === 0) {
        $zeroCount++;
      }
    }
    
    $recalculatedLines[] = $newLine;
  } while ($zeroCount !== count(end($recalculatedLines)));
  
  $prevValue = array_pop($recalculatedLines);
  if ($prevValue !== null) {
    $reversedPrevArray = array_reverse($prevValue);
    $prevValue = array_pop($reversedPrevArray);
  }
  
  while (count($recalculatedLines) > 0) {
    $nextArray = array_pop($recalculatedLines);

    if ($nextArray !== null) {
      $reversedNextArray = array_reverse($nextArray);
      $nextValue = array_pop($reversedNextArray);
      $prevValue = $nextValue - $prevValue;
    }
  }
  
  return $sum + $prevValue;
}, 0);

echo $result;