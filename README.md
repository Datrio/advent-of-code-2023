# Approach

I start every day with defining the problem and trying to run my first solution in JS on example.txt. Once that's working, I switch the execution to input.txt and solve any edge cases. Then I might switch to PHP or go to part 2.

For the PHP solution to save the time, I ask ChatGPT to rewrite my JS solution into PHP and then search for optimizations and specific PHP solutions I can apply.

# Scripts

- `./newday.sh` to create a new folder for the day, connect to https://adventofcode.com/ and retrieve the latest data as example.txt and input.txt
- `./run.sh TYPE DAY PART` to execute the scripts, all arguments are optional, without any arguments it'll execute both parts of the node.js solution for the latest day
