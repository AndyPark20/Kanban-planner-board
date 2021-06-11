require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

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

// app.get('/test', (req, res, next) => {
//   console.log('hello good sir');
// });

// TESTING LOG IN
app.post('/submit', (req, res, next) => {
  console.log('working');

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
