<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

function checkSurroundingEnginePart($number, $x, $y, $lines) {
    $checkEngineChar = function($char) {
        return $char !== '.';
    };
    $length = strlen($number);

    // left & right
    if ($checkEngineChar($lines[$y][$x - 1] ?? '.') || $checkEngineChar($lines[$y][$x + $length] ?? '.')) {
        return true;
    }

    // top & bottom
    for ($i = $x - 1; $i <= $x + $length; $i++) {
        if ($checkEngineChar($lines[$y - 1][$i] ?? '.') || $checkEngineChar($lines[$y + 1][$i] ?? '.')) {
            return true;
        }
    }

    return false;
}

$result = 0;

foreach ($lines as $y => $line) {
    // Find all matches of numbers in the line
    preg_match_all('/[0-9]+/', $line, $matches, PREG_OFFSET_CAPTURE);

    foreach ($matches[0] as $match) {
        if (checkSurroundingEnginePart($match[0], $match[1], $y, $lines)) {
            $result += intval($match[0]);
        }
    }
}

echo $result;
