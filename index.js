const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static("public"));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/homepage.html', { root: __dirname + "/public" });
});

app.get('/history', async (req, res) => {
  console.log('Getting player search history');

  const { data, error } = await supabase.from('player_searches').select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log('Recieved Data:', data.length);
    res.json(data);
  }
});

app.post('/save-search', async (req, res) => {
  console.log('Saving Search');
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const username = req.body.username;
  const archetype = req.body.archetype;

  if (!username || !archetype) {
    
    res.statusCode = 400;
    res.json({
      message: `Username and archtype are required`,
    });
    return;
  }

  const { data, error } = await supabase
    .from('player_searches')
    .insert({
      username: username,
      archetype: archetype,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.get("/api/player/:username",async (req, res) => {

    const username = req.params.username;

    try {

        const response = await fetch(`https://api.chess.com/pub/player/${username}`);

        const data = await response.json();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message:
                'Unable to fetch player profile'
        });

    }

});

app.get("/api/stats/:username", async (req, res) => {
    const username = req.params.username;

    console.log(`Getting stats for ${username}`);

    try {
      const response = await fetch(`https://api.chess.com/pub/player/${username}/stats`);

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: 'Unable to retrive data'
      });
    }
  });

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
