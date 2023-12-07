<?php
// Read the file into an array, one line per element
$lines = file(__DIR__ . '/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$lines = array_map('trim', $lines);

$strengths = [
    'A' => 14,
    'K' => 13,
    'Q' => 12,
    'J' => 11,
    'T' => 10,
    '9' => 9,
    '8' => 8,
    '7' => 7,
    '6' => 6,
    '5' => 5,
    '4' => 4,
    '3' => 3,
    '2' => 2
];

$gameTypes = ['high', 'pair', 'pair2', 'three', 'full', 'four', 'five'];

$games = array_fill_keys($gameTypes, []);

foreach ($lines as $line) {
    list($game, $bet) = explode(' ', $line);
    $charCounts = array_count_values(str_split($game));
    arsort($charCounts);
    $maxCharCount = reset($charCounts);
    $secondMaxCharCount = next($charCounts) ?: 0;

    if ($maxCharCount === 5) {
        $gameType = 'five';
    } elseif ($maxCharCount === 4) {
        $gameType = 'four';
    } elseif ($maxCharCount === 3 && $secondMaxCharCount === 2) {
        $gameType = 'full';
    } elseif ($maxCharCount === 3) {
        $gameType = 'three';
    } elseif ($maxCharCount === 2 && $secondMaxCharCount === 2) {
        $gameType = 'pair2';
    } elseif ($maxCharCount === 2) {
        $gameType = 'pair';
    } else {
        $gameType = 'high';
    }

    $games[$gameType][] = ['game' => $game, 'bid' => (int)$bet];
}

foreach ($gameTypes as $gameType) {
    usort($games[$gameType], function ($a, $b) use ($strengths) {
        for ($i = 0; $i < 5; $i++) {
            $diff = $strengths[$a['game'][$i]] - $strengths[$b['game'][$i]];
            if ($diff !== 0) return $diff;
        }
        return 0;
    });
}

$sum = 0;
$i = 1;
foreach ($gameTypes as $gameType) {
    foreach ($games[$gameType] as $game) {
        $sum += $game['bid'] * $i++;
    }
}

echo $sum;
