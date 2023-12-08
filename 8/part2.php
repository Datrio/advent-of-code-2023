<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt');
$lines = array_map('trim', $lines);

$dirs = $lines[0];
$pathsRaw = array_slice($lines, 2);

$paths = [];
$startingPaths = [];

foreach ($pathsRaw as $line) {
    [$path, $val] = explode(' = ', $line);
    $paths[$path] = [substr($val, 1, 3), substr($val, 6, 3)];

    if ($path[2] === 'A') {
        $startingPaths[] = $path;
    }
}

$listOfI = array_map(function($path) use ($paths, $dirs) {
  $currentKey = $path;
  $i = 0;

  while ($currentKey[2] !== 'Z') {
      $currentKey = $dirs[$i % strlen($dirs)] === 'R' ? $paths[$currentKey][1] : $paths[$currentKey][0];
      $i++;
  }

  return $i;
}, $startingPaths);

function calculateLCM($arr) {
  return array_reduce($arr, function($lcm, $current) {
      return gmp_strval(gmp_lcm($lcm, $current));
  }, 1);
}

echo calculateLCM($listOfI);