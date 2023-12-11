<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

$lineOffset = 0;
$emptyColumnsCheck = array_fill(0, strlen($lines[0]), false);

$universeEnlarge = 1000000 - 1;

$galaxies = [];
$lineLength = strlen($lines[0]);

foreach ($lines as $lineIndex => $line) {
  // no galaxies in line
  if (strpos($line, "#") === false) {
    $lineOffset += $universeEnlarge;

    continue;
  }
  
  for ($index = 0; $index < $lineLength; $index++) {
    if ($line[$index] === '#') {
      $galaxies[] = [$lineIndex + $lineOffset, $index];

      // mark column as potentially empty
      $emptyColumnsCheck[$index] = true;
    }
  }
}

// expand the columns
$charOffset = 0;

$emptyColumnsOffset = array_map(function ($v) use (&$charOffset, $universeEnlarge) {
  if (!$v) {
    $charOffset += $universeEnlarge;
  }
  return $charOffset;
}, $emptyColumnsCheck);

foreach ($galaxies as $key => $value) {
  $galaxies[$key] = [$value[0], $value[1] + $emptyColumnsOffset[$value[1]]];
}
unset($galaxy);

$sum = 0;

function shortestPath($start, $end) {
  return abs($start[0] - $end[0]) + abs($start[1] - $end[1]);
}

$galaxyCount = count($galaxies);

for ($i = 0; $i < $galaxyCount; $i++) {
  for ($j = $i + 1; $j < $galaxyCount; $j++) {
    $sum += shortestPath($galaxies[$j], $galaxies[$i]);
  }
}

echo $sum;