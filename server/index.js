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

// userId login
let userIdNumber = null;

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
    const sql = `
  insert into "users"( "firstName", "lastName", "userName","password")
  values ($1,$2,$3, $4)
  returning *
  `;
    const params = [firstname, lastname, username, hash];
    const result = await db.query(sql, params);
    if (result.rows[0].password) {
      res.status(201).json('Account has been created!');
    } else {
      res.status(400).json('Something went wrong, please try again');
    }
  } catch (err) {
    console.error('ERR' + err);
  }
});

// POST METHOD for sign in credentials
app.post('/api/logIn', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const sql = `
    select "password",
           "userId"
    from "users"
    where "userName" =$1;
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const userId = result.rows[0].userId;
    userIdNumber = userId;
    if (result.rows[0]) {
      const checkPassword = result.rows[0].password;
      const argon2Verify = await argon2.verify(checkPassword, password);
      if (argon2Verify) {
        res.status(201).json('Welcome!');
      } else {
        res.status(404).json('Password Invalid X_x');
      }
    } else {
      res.status(404).json('Sorry that Username is not found!');
    }
  } catch (err) {
    console.error('ERR' + err);
  }

});
// POST METHOD for adding card
app.post('/api/addCard', async (req, res, next) => {
  const cardColumnName = req.body[0];
  const cardDescription = req.body[1].name;
  try {
    const sql = `
      insert into "activities" ("userId","column","card")
      values ($1,$2, $3)
      returning *;
      `;
    const params = [userIdNumber, cardColumnName, cardDescription];
    const result = await db.query(sql, params);

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
});

// APP GET to retrieve Data
app.get('/api/retrieve', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "activities"
    where "userId"= $1;
  `;
    const params = [1];
    const result = await db.query(sql, params);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }

});

// Update Card Title
app.post('/api/update', async (req, res, next) => {
  const id = req.body.cardId;
  const name = req.body.name;
  try {
    const sql = `
    update "activities"
    set "card" = $1
    where "cardId" = $2;
    `;
    const params = [name, id];
    const result = await db.query(sql, params);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
});

// activity Update
app.post('/api/activity', (req, res, next) => {
  req.body.forEach((values, index) => {
    values.list.forEach((values, listIndex) => {
      values.activity.forEach((values, index) => {
        console.log(values);
      });
      // try {
      //   const sql = `
      //   insert into "public.activities" ("cardId","record", "time")
      //   values($1,$2,$3)
      //   returning *;
      //   `;
      //   if (values.activity) {
      //     const params = [values.cardId, values.activity, values.activity.time];
      //     const result = await db.query(sql, params);
      //   }

      // } catch (err) {
      //   console.error(err);
      // }
      console.log(values.cardId);
    });
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
