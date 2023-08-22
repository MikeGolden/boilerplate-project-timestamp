// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date", (req, res) => {
  let dateString = req.params.date_string;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

app.get('/api/:date?', (req, res) => {
  const inputDate = req.params.date;

  if (inputDate === undefined) {
    const currentUnixTimestamp = new Date().getTime();
    const currentUtcFormattedDate = new Date().toUTCString();
    res.json({ unix: currentUnixTimestamp, utc: currentUtcFormattedDate });
  } else {
    const timestamp = Date.parse(inputDate);
    
    if (/\d{5,}/.test(inputDate)) {
      const unixTimestamp = new Date(inputDate).getTime();
      const utcFormattedDate = new Date(inputDate).toUTCString();
      res.json({ unix: inputDate, utc: utcFormattedDate });
    } else {
      res.json({ error: 'Invalid Date' });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
