<?php
// Read the file into an array, one line per element
$lines = file('input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$result = 0;
foreach ($lines as $line) {
    $data = substr($line, strpos($line, ':') + 1);
    $gameData = explode(';', $data);

    $highestCubes = [
        'red' => 0,
        'blue' => 0,
        'green' => 0
    ];

    foreach ($gameData as $game) {
        $items = explode(',', $game);

        foreach ($items as $item) {
            list($amount, $color) = explode(' ', trim($item));

            $highestCubes[$color] = max($highestCubes[$color], $amount);
        }
    }

    $result += $highestCubes['red'] * $highestCubes['green'] * $highestCubes['blue'];
}

echo $result;
?>