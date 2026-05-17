# inst377-final-project - Chess Archetype Analyzer

## Project Decsription

ChessArchetype Analyzer is a web application that analyzes a Chess.com player's gameplay style based on their bullet, blitz, and rapid ratings. The system categorizes players into archetypes such as Speeder, Strategist, Blitzer, or balanced providing a breakdown of their chess behavior. The project uses Chess.com public API data to display user statistics.

## Target browsers

This application is designed to run on web browsers such as Google, Firefox, Safari, etc. It has NOT been tested on mobile.

# Developer Manual

## 1. Clone the Repository and open

git clone "https://github.com/kaustin4/inst377-final-project-.git"

## 2. Install dependenceis

npm install

## 3. Create a .env file in the directory with own Supabase URL + API Key

EX: SUPABASE_URL = your_url
SUPABASE_KEY = your_key

## Start the sever (Local)

type in node index.js into your terminal -> it should run on http://localhost:3000

## Open in Browser

Ex: http://localhost:3000/homepage.html (Can just copy and paste link)

## Get player profile for external API

GET /api/player/:usename

## Get player stats

GET /api/stats/player/:usename

### Example

GET /api/player/hikaru
GET /api/stats/player/hikaru

## Get Search History - Datbase

GET /history -> retrives all saved player searches from Supabase

## Save Search - Database

POST /save-search
-> request
(Example)
{
"username": "hikaru",
"archetype": "Blitzer"
}
Saves player data into Supabase

# Database setup

This project uses Supabase and requires the table "player_searches". It has colums id(automated), username + archetype (text), and created_at (timestamp).

## Testing

Testing was performed using a personal browser, POSTMAN/URL testing, and console logs for API validation.

## Known Bugs

1. History many not update after saving without a refresh
2. Depends on API availability

## Future Improvements

- Improve UI styling and responsiveness
- Include more archetypes
- Add filtering for search history
