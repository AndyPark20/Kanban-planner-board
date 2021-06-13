require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const cors = require('cors');
const json = express.json();
const argon2 = require('argon2');

const app = express();

app.use(json);
app.use(cors());
app.use(staticMiddleware);

app.get('/api/picture/:query/:orientation/:size', (req, res, next) => {
  fetch(`https://api.pexels.com/v1/search?query=${req.params.query}&orientation=${req.params.orientation}&size=${req.params.size}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: '563492ad6f917000010000010af25f7c94cc48d29741c25d8bf6aa0f'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      res.status(201).json(data);
    });
});

// POST method for sign up credentials
app.post('/test', (req, res, next) => {
  console.log('hello good sir');
});

// POST METHOD for sign in credentials
app.post('/api/logIn', async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.username);
    res.status(201).json('Welcome');
  } catch (err) {
    console.log('ERR' + err);
  }

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
