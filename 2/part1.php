<?php
// Read the file into an array, one line per element
$lines = file('input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$cubeLimit = [
    'red' => 12,
    'green' => 13,
    'blue' => 14
];

function isValidGame($gameData, $cubeLimit) {
    foreach ($gameData as $game) {
        $gameParts = explode(',', $game);

        foreach ($gameParts as $part) {
            $part = explode(' ', trim($part));

            if ($cubeLimit[$part[1]] < $part[0]) {
                return false;
            }
        }
    }
    return true;
}

$result = 0;

foreach ($lines as $line) {
    list($game, $data) = explode(':', $line, 2);
    $gameNo = substr($game, 5);
    $gameData = explode(';', $data);

    if (isValidGame($gameData, $cubeLimit)) {
        $result += $gameNo;
    }
}

echo $result;

?>