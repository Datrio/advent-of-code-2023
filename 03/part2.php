<?php
// Read the file into an array, one line per element
$lines = file('input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$gears = [];

function checkSurroundingEnginePart($number, $x, $y, $lines) {
    $checkGearChar = function($char) {
        return $char === '*';
    };

    $length = strlen($number);

    // left & right
    if ($checkGearChar($lines[$y][$x - 1] ?? '.')) return ['x' => $x - 1, 'y' => $y];
    if ($checkGearChar($lines[$y][$x + $length] ?? '.')) return ['x' => $x + $length, 'y' => $y];

    // top & bottom
    for ($i = $x - 1; $i <= $x + $length; $i++) {
        if ($checkGearChar($lines[$y - 1][$i] ?? '.')) return ['x' => $i, 'y' => $y - 1];
        if ($checkGearChar($lines[$y + 1][$i] ?? '.')) return ['x' => $i, 'y' => $y + 1];
    }

    return null;
}

foreach ($lines as $y => $line) {
    preg_match_all('/[0-9]+/', $line, $matches, PREG_OFFSET_CAPTURE);
    foreach ($matches[0] as $match) {
        $checkGear = checkSurroundingEnginePart($match[0], $match[1], $y, $lines);

        if ($checkGear) {
            $gearKey = $checkGear['x'] . 'x' . $checkGear['y'];

            if (!isset($gears[$gearKey])) {
                $gears[$gearKey] = ['value' => 1, 'count' => 0];
            }

            $gears[$gearKey]['value'] *= $match[0];
            $gears[$gearKey]['count']++;
        }
    }
}

$result = array_reduce($gears, function($sum, $gear) {
    return $gear['count'] === 2 ? $sum + $gear['value'] : $sum;
}, 0);

echo $result;
