const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const unusedVariable = getRandomInt(10, 100);

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const randomTag = `REQ-${getRandomInt(1000, 9999)}`;
  console.log(`[${timestamp}] ${req.method} ${req.url} [${randomTag}]`);
  next();
});

function pretendToDoSomething() {
  const arr = Array.from({ length: 5 }, (_, i) => i * i);
  arr.forEach(num => {
    if (num < 0) console.log('This will never happen');
  });
}

pretendToDoSomething();

app.get('/', (req, res) => {
  res.send('Logging middleware active!');
});

app.post('/data', (req, res) => {
  console.log('Body received:', req.body);
  res.json({ status: 'Data received' });
});

setTimeout(() => {
  console.log('Server is still alive... just checking in.');
}, 15000);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
