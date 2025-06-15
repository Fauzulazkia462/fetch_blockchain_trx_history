# How to setup and run? 

## Install dependencies
run `npm install` on terminal.

## Create the database
Take the query from `DB/create_db_FTDA.sql` and run it on your postgree admin.

## Setup .env
if your db runs on different port or credentials as declared in .env, update the .env.

## Run the app
- `npm run fetch:eth` for eth.
- `npm run fetch:btc` for btc.
- `npm run fetch:sol` for sol.

## Data is saved
Take a look at `Data/{chain}BlockchaintrxData` and enjoy your data 🍵.
