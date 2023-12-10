<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt');
$lines = array_map('trim', $lines);

$dirs = $lines[0];
$pathsRaw = array_slice($lines, 2);

$paths = [];

foreach ($pathsRaw as $line) {
  [$path, $val] = explode(' = ', $line);
  $paths[$path] = [substr($val, 1, 3), substr($val, 6, 3)];
}

$currentKey = 'AAA';
$i = 0;

while ($currentKey !== 'ZZZ') {
  $currentKey = $dirs[$i % strlen($dirs)] === 'R' ? $paths[$currentKey][1] : $paths[$currentKey][0];
  $i++;
}

echo $i;