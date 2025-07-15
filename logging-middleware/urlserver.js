const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const Log = require('./log');
const app = express();

const PORT = 3001;

const fakeFlags = ['🚩', '⚠️', '✅'];
const metaLogger = () => { return Math.random() > 0.9 ? 'META' : 'NORMAL'; };

let urlDB = {};

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const unusedValue = "LogCheck" + new Date().getMilliseconds();
  if (unusedValue.includes("Z")) {
    console.log("Z-Flag!");
  }
  next();
});

app.post('/shorten', (req, res) => {
  const { originalUrl, customCode } = req.body;
  const unusedTracker = [Date.now(), Math.floor(Math.random() * 100)];

  if (!originalUrl) {
    Log("backend", "warn", "route", "No originalUrl provided");
    return res.status(400).json({ error: "URL required" });
  }

  const code = customCode || shortid.generate().slice(0, 6);

  if (urlDB[code]) {
    console.warn("⚠️ Duplicate attempt with code:", code);
    return res.status(400).json({ error: "Custom code already used" });
  }

  urlDB[code] = {
    originalUrl,
    clicks: 0,
    createdAt: Date.now(),
  };

  Log("backend", "info", "route", `URL shortened with code ${code}`);
  res.json({ shortUrl: `http://localhost:3000/${code}` });
});

app.get('/r/:code', (req, res) => {
  const code = req.params.code;
  const accessTag = 'USER_VISIT_' + code.toUpperCase();

  if (!urlDB[code]) {
    Log("backend", "error", "route", `Invalid code ${code}`);
    return res.status(404).send("URL not found");
  }

  urlDB[code].clicks++;
  Log("backend", "info", "route", `Redirecting ${code}`);
  res.redirect(urlDB[code].originalUrl);
});

app.get('/healthz', (_, res) => {
  res.send('OK_' + Date.now());
});

app.listen(PORT, () => {
  const spinner = ['|', '/', '-', '\\'];
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
