#!/bin/bash

# Find the highest numbered folder and increment by one
HIGHEST_NUM=$(find . -maxdepth 1 -type d -name '[0-9]*' | awk -F'/' '{print $NF}' | sort -n | tail -1)
NEXT_DAY=$((HIGHEST_NUM + 1))

# Assign NEXT_DAY to DAY
DAY=$NEXT_DAY

# Copy the tmpl folder to a new folder named ${DAY}
cp -r tmpl "${DAY}"

SESSION_VALUE=$(<session.txt)

# Download the input file and save it in the ${DAY} folder
curl --cookie "session=${SESSION_VALUE}" "https://adventofcode.com/2023/day/${DAY}/input" -o "${DAY}/input.txt"

PAGE_CONTENT=$(curl --cookie "session=${SESSION_VALUE}" "https://adventofcode.com/2023/day/${DAY}")

# Extract the first <code> block and save it as example.txt in the ${DAY} folder
echo "$PAGE_CONTENT" | awk '{
    if (in_code) {
        if (/<\/code><\/pre>/) {
            print;
            exit;
        }
        print;
    } 
    if (/<pre><code>/) {
        in_code = 1;
        print;
    }
}' | sed 's/<pre><code>//;s/<\/code><\/pre>//' > "${DAY}/example.txt"

awk 'NF' "${DAY}/example.txt" > temp.txt && mv temp.txt "${DAY}/example.txt"
