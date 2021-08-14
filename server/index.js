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
  const cardDescription = req.body[1];
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

// APP get to retrieve cardId
app.get('/api/cardIdRetrieve', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "activities"
    `;
    const result = await db.query(sql);
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
  `;
    const params = [userIdNumber];
    const result = await db.query(sql);
    if (result) {
      const sqlRecord = `
      select *
      from "record"
      `;
      const recordResult = await db.query(sqlRecord);
      if (recordResult) {
        const description = `
        select*
        from "description"
        `;
        const descriptionResult = await db.query(description);
        // Create an object with result and record result and send it to the front end
        const combinedObject = result.rows.map(values => {
          if (values.userId === userIdNumber) {
            const activity = [];
            recordResult.rows.forEach(recordValues => {
              if (values.cardId === recordValues.cardId) {
                activity.push(recordValues);
                values.activity = activity;
                values.description = recordValues.description;
              }
            });
          }
          return values;
        });
        const updateDescriptionObject = combinedObject.map((values, index) => {
          descriptionResult.rows.forEach((descValue, index) => {
            if (descValue.cardId === values.cardId) {
              values.description = descValue.description;
            }
          });
          return values;
        });
        // use map to filterOut by userIdNumber
        const finalObject = updateDescriptionObject.map(values => {
          if (values.userId === userIdNumber) {
            return values;
          }
        });
        // use Filter method to filter out Null
        const filteredObject = finalObject.filter(Boolean);
        res.status(201).send(filteredObject);
      }
    }
  } catch (err) {
    console.error(err);
  }

});

// Update Card Title
app.post('/api/update', async (req, res, next) => {
  const id = req.body.cardId;
  const name = req.body.card;
  try {
    const sql = `
    update "activities"
    set "card" = $1
    where "cardId" = $2
    returning *;
    `;
    const params = [name, id];
    const result = await db.query(sql, params);
    console.log('result', result.rows);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
  }
});

// activity Update
app.post('/api/activity', async (req, res, next) => {
  const inputData = req.body;
  const cardName = req.body.list;
  const cardColumnId = req.body.cardNumber;
  let time = '';
  let mainCardId = null;
  let activityValue = '';
  const sql = `
  insert into "record" ("cardId","columnId","record","time")
  values ($1,$2,$3,$4)
  returning *;
  `;
  try {
  // loop thru body property of the req object to retrieve values from activity
    inputData.activity.forEach((values, index) => {
      activityValue = values.info;
      time = values.time;
      mainCardId = values.mainCardId;
    });
    const params = [mainCardId, cardColumnId, activityValue, time];
    const result = await db.query(sql, params);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
  }

});

// Description update
app.post('/api/description', async (req, res, next) => {
  const cardId = req.body[0];
  const description = req.body[1];
  console.log('CARDID', cardId);
  console.log('DESCRIPTION', description);
  try {
    const sql = `
    insert into "description" ("cardId","description")
    values ($1,$2)
    returning*;
    `;
    const params = [cardId, description];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

// update moving cards
app.post('/api/cardMove', async (req, res, next) => {
  const columnName = req.body[0];
  const cardName = req.body[1];
  console.log(columnName, cardName);

  const sql = `
  update "activities"
  set "column" =$1
  where "card" =$2
  `;

  const params = [columnName, cardName];
  const result = await db.query(sql, params);
  console.log('result', result);
  res.status(201).json(result);

});

// Delete Cards
app.delete('/api/delete/:columnNumber/:cardNumber', async (req, res, next) => {
  console.log('hello');
  console.log('req.params', req.params);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
