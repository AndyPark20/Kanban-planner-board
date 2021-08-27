require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const cors = require('cors');
const json = express.json();
const argon2 = require('argon2');
const pg = require('pg');
const app = express();
const jwt = require('jsonwebtoken');

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

// Fetch background images
app.get('/api/picture/:query/:orientation/:size', async (req, res, next) => {
  try {
    const background = await fetch(`https://api.pexels.com/v1/search?query=${req.params.query}&orientation=${req.params.orientation}&size=${req.params.size}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: '563492ad6f917000010000010af25f7c94cc48d29741c25d8bf6aa0f'
      }
    });
    const result = await background.json();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
});

// Store selected background URL
app.post('/api/wallpaper', async (req, res, next) => {
  const wallpaperUrl = req.body[0];
  const existingWallPaperUrlStatus = req.body[1];

  // If existingWallPaperUrlStatus is false, then it means that there are no saved wallpaper Url, if so use Post method to update the db
  if (!existingWallPaperUrlStatus) {
    try {
      const sql = `
      insert into "wallpapers" ("userId","url")
      values ($1,$2)
      returning*
      `;
      const params = [userIdNumber, wallpaperUrl];
      const updateWallPaperUrl = await db.query(sql, params);
      res.status(201).json(updateWallPaperUrl);
    } catch (err) {
      console.error(err);
    }
    // IF existingWallPaperUrlStatus is TRUE, then it means that user previously saved wallpaper Url, if so use update to replace the existing URL
  } else {
    const sql = `
    update "wallpapers"
    set "url" =$1
    where "userId" =$2
    returning*
    `;
    const params = [wallpaperUrl, userIdNumber];
    const replaceWallPaper = await db.query(sql, params);
    res.status(201).json(replaceWallPaper);
  }

});

// get Background url
app.get('/api/getWallpaper', async (req, res, next) => {
  try {
    const sql = `
  select *
  from "wallpapers"
  where "userId"= $1;
  `;
    const params = [userIdNumber];
    const result = await db.query(sql, params);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
  }
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
        // Serialize the user once there is a matching password
        const token = jwt.sign(username, process.env.TOKEN_SECRET);
        res.status(201).json({ auth: 'Welcome', token: token });
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

// VERIFY TOKEN
app.post('/api/verifyToken', async (req, res, next) => {
  console.log(req.body);
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
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
  }
});

// activity Update
app.post('/api/activity', async (req, res, next) => {
  const cardId = req.body.cardId;
  const cardColumnId = req.body.cardNumber;
  let time = '';
  let activityValue = '';
  const sql = `
  insert into "record" ("cardId","columnId","record","time")
  values ($1,$2,$3,$4)
  returning *;
  `;
  try {
    // loop thru body property of the req object to retrieve values from activity
    req.body.activity.forEach((values, index) => {
      activityValue = values.record;
      time = values.time;
    });
    const params = [cardId, cardColumnId, activityValue, time];
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

  const sql = `
  update "activities"
  set "column" =$1
  where "card" =$2
  `;

  const params = [columnName, cardName];
  const result = await db.query(sql, params);
  res.status(201).json(result);

});

// Delete Cards
app.delete('/api/delete/:cardId', async (req, res, next) => {
  const cardId = req.params.cardId;
  try {
    const sql = `
  delete from "activities"
  where "cardId" = $1
  returning*;
  `;
    const deleteCard = [cardId];
    const deleteCardResult = await db.query(sql, deleteCard);
    // Delete description
    if (deleteCardResult) {
      const sql = `
      delete from "description"
      where "cardId"=$1
      returning*
      `;
      const deleteDescription = [cardId];
      const deleteDescriptionResult = await db.query(sql, deleteDescription);

      // delete Record
      if (deleteDescriptionResult) {
        const sql = `
      delete from "record"
      where "cardId" =$1
      returning*
      `;
        const deleteRecord = [cardId];
        const deleteRecordResult = await db.query(sql, deleteRecord);
        res.status(201).json(deleteRecordResult);
      }
    }
  } catch (err) {
    console.error(err);
  }

});

// Edit Activity
app.post('/api/editActivity', async (req, res, next) => {
  // retrieve to be updated info (activityId, updatedInfo, time)
  const activityCardId = req.body[1].activityId;
  const editActivityDetails = req.body[0].record;
  const editActivityTime = req.body[0].time;

  try {
    const sql = `
  update "record"
  set "record" =$1, "time" =$2
  where "activityId" = $3
  `;
    const params = [editActivityDetails, editActivityTime, activityCardId];
    const editActivityResult = await db.query(sql, params);
    res.status(201).json(editActivityResult);
  } catch (err) {
    console.error(err);
  }

});

// Delete Activity
app.delete('/api/deleteActivity/:cardId', async (req, res, next) => {
  const cardIdToDelete = parseInt(req.params.cardId);
  const sql = `
  delete from "record"
  where "activityId" =$1
  returning*
  `;
  const params = [cardIdToDelete];
  const deleteActivity = await db.query(sql, params);
  res.status(201).json(deleteActivity);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
