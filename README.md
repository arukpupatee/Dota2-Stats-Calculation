# Dota2 Stats Calculation

## Setup

1. Get API tokens from https://stratz.com/api
2. Duplicate .env.example file and rename to .env
3. Replace EXAMPLE_API_TOKEN to your API tokens from 1.

## Run

```bash
node index.js
```

## Example result

```
Game mode ALL_PICK_RANKED, WIN
Total matches: 50
Average last hits per minute: 5.309491458417094
KDA: 6.193415637860082


Game mode ALL_PICK_RANKED, LOSE
Total matches: 50
Average last hits per minute: 4.3215516374933705
KDA: 2.1865671641791047


Game mode TURBO, WIN
Total matches: 50
Average last hits per minute: 3.917738288940904
KDA: 8.614814814814816


Game mode TURBO, LOSE
Total matches: 50
Average last hits per minute: 3.7370365544019672
KDA: 2.0351437699680512
```

## Stratz API documentation

https://docs.stratz.com/index.html
