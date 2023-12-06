<?php
// Read the file into an array, one line per element
$lines = trim(file_get_contents(__DIR__ . '/input.txt'));

// Split the content into separate sections
list($seedsRaw, $paths) = explode("\n\n", $lines, 2);
$paths = explode("\n\n", $paths);

// Process the seeds
$seeds = array_map('intval', explode(' ', substr($seedsRaw, 7)));
$seedRanges = [];
for ($i = 0; $i < count($seeds); $i += 2) {
  $seedRanges[] = [$seeds[$i], $seeds[$i + 1], $seeds[$i] + $seeds[$i + 1]];
}

foreach ($paths as $path) {
  $ranges = explode("\n", $path);
  array_shift($ranges); // Remove the first element
  $newSeedRanges = $seedRanges;
  
  foreach ($ranges as $r) {
    list($destination, $source, $len) = array_map('intval', explode(' ', $r));
    $ruleRange = [$source, $len, $source + $len];
    
    foreach ($seedRanges as $index => $seedRange) {
      $overlap = getOverlapOfRanges($ruleRange, $seedRange);
      
      if ($overlap) {
        // Remove the overlapping range
        unset($newSeedRanges[$index]);
        
        // Calculate the remaining ranges after removing the overlap
        $restRanges = removeRange($seedRange, $overlap);
        foreach ($restRanges as $restRange) {
          $newSeedRanges[] = $restRange;
        }
        
        // Adjust the overlap range according to the rule and add it back
        $overlap[0] += $destination - $source;
        $overlap[2] += $destination - $source;

        if ($overlap[0] > $overlap[1]) { // Ensure the range is valid
          $newSeedRanges[] = $overlap;
        }
      }
    }
  }
  
  $seedRanges = array_values($newSeedRanges); // Reset seedRanges for the next path
}

echo min(array_column($seedRanges, 0));

function getOverlapOfRanges($r1, $r2) {
  $overlapStart = max($r1[0], $r2[0]);
  $overlapEnd = min($r1[2], $r2[2]);
  
  return $overlapStart < $overlapEnd ? [$overlapStart, $overlapEnd - $overlapStart, $overlapEnd] : false;
}

function removeRange($r1, $r2) {
  list($start1, , $end1) = $r1;
  list($start2, , $end2) = $r2;
  
  $result = [];
  if ($start2 > $start1) $result[] = [$start1, $start2 - $start1, $start2];
  if ($end2 < $end1) $result[] = [$end2, $end1 - $end2, $end1];
  
  return $result;
}