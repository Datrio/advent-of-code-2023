<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

$oneLineInput = implode('', $lines);
$locationY = intval(floor(strpos($oneLineInput, 'S') / strlen($lines[0])));
$locationX = strpos($oneLineInput, 'S') % strlen($lines[0]);

$pipeEntries = [
  '-1,0' => '|7F',
  '1,0'  => '|LJ',
  '0,-1' => '-LF',
  '0,1'  => '-J7'
];
$possiblePaths = [
  '|' => [[-1, 0], [1, 0]],
  '-' => [[0, -1], [0, 1]],
  'L' => [[-1, 0], [0, 1]],
  'J' => [[-1, 0], [0, -1]],
  'F' => [[1, 0], [0, 1]],
  '7' => [[1, 0], [0, -1]],
  'S' => [[1, 0], [0, -1], [0, 1], [-1, 0]]
];

function checkLocations($lines, $y, $x, $changeY = null, $changeX = null, $stepCount = 0) {
  global $pipeEntries, $possiblePaths;
  
  $currentPipe = $lines[$y][$x];
  
  foreach ($possiblePaths[$currentPipe] as list($pathY, $pathX)) {
    $nextY = $y + $pathY;
    $nextX = $x + $pathX;
    
    if (isset($lines[$nextY][$nextX])) {
      $nextStep = $lines[$nextY][$nextX];
    } else {
      continue;
    }
    
    if (-$pathY === $changeY && -$pathX === $changeX) {
      continue;
    }
    
    if ($nextStep === 'S') {
      return $stepCount;
    }
    
    if (strpos($pipeEntries["$pathY,$pathX"], $nextStep) !== false) {
      return checkLocations($lines, $nextY, $nextX, $pathY, $pathX, $stepCount + 1);
    }
  }
}

$stepCount = checkLocations($lines, $locationY, $locationX);

echo ceil($stepCount / 2); // take the mid point of the path