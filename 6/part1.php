<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

// Extract times and distances from the lines
$times = array_map('intval', preg_split('/\s+/', trim(substr($lines[0], 5))));
$distances = array_map('intval', preg_split('/\s+/', trim(substr($lines[1], 9))));

$data = [];
foreach ($times as $i => $time) {
    $data[] = [
        'time' => $time,
        'distance' => $distances[$i]
    ];
}

$finalResult = 1;
foreach ($data as $datum) {
    $distance = $datum['distance'];
    $time = $datum['time'];

    $successCount = 0;
    for ($timeHeld = 1; $timeHeld <= $time; $timeHeld++) {
        $travelTime = $time - $timeHeld;
        $travelSpeed = $timeHeld;
        $distanceTraveled = $travelSpeed * $travelTime;

        if ($distanceTraveled >= $distance) {
            $successCount++;
        }
    }

    $finalResult *= $successCount;
}

echo $finalResult;
