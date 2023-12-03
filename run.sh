#!/bin/bash

# Assign arguments to variables for better readability
TYPE=${1:-js}
DAY=$2
PART=$3

if [ -z "$DAY" ]; then
    DAY=$(find . -maxdepth 1 -type d -name '[0-9]*' | awk -F'/' '{print $NF}' | sort -n | tail -1)
fi

execute_script() {
    local part=$1
    local type_upper=$(echo "$TYPE" | tr '[:lower:]' '[:upper:]')
    echo "Executing AoC 2023, $type_upper, Day $DAY, Part $part"

    case $TYPE in
        js)
            node "$DAY/part$part.js"
            ;;
        php)
            php "$DAY/part$part.php"
            echo ""
            ;;
    esac
}

# Execute based on whether PART is provided or not
if [ -z "$PART" ]; then
    # Execute for both PART 1 and 2
    execute_script 1
    execute_script 2
else
    # Execute for the specified PART
    execute_script $PART
fi