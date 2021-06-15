require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const cors = require('cors');
const json = express.json();
const argon2 = require('argon2');
const pg = require('pg');

const app = express();

app.use(json);
app.use(cors());
app.use(staticMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

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
app.post('/api/signup', async (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.userName;
  try {
    const hash = await argon2.hash(req.body.password);
    if (hash) {
      res.status(201).json('Success!');
    } else {
      res.status(400).json('Something went wrong, please try again');
    }
  } catch (err) {
    console.error('ERR' + err);
  }

  const sql = `
  insert into "users"( "firstName", "lastName", "userName","password")
  values ($1,$2,$3, $4)
  returning *
  `;
  const params = [firstname, lastname, username, hash];
  db.query(sql, params);
});

// POST METHOD for sign in credentials
app.post('/api/logIn', async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.username);
    res.status(201).json('Welcome');
  } catch (err) {
    console.error('ERR' + err);
  }

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
