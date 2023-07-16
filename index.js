/* eslint-disable no-multi-spaces */
/* eslint-disable import/no-unresolved */
// index.js
// where your node app starts

// init project
const express = require('express');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});
app.get('/api/:date', (req, res) => {
  const entry = req.params.date;
  let date;
  let unixTimeStamp;
  let resultDateString;
  const isNumber = (x) => !Number.isNaN(Number(x));

  if (isNumber(entry)) {
    unixTimeStamp = Number(req.params.date);
    resultDateString = ((new Date(unixTimeStamp)).toUTCString());
  } else {
    unixTimeStamp = Date.parse(entry);
    if (!isNumber(unixTimeStamp)) {
      res.json({ error: 'Invalid Date' });
      return;
    }

    date = new Date(req.params.date);
    unixTimeStamp = Math.floor(date.getTime());
    resultDateString = date.toUTCString();
  }

  const resultObject = { unix: unixTimeStamp, utc: resultDateString };
  res.json(resultObject);
});
app.get('/api/', (req, res) => {
  res.json({ unix: Math.floor(new Date()), utc: new Date() });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
