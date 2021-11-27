const express = require('express');
const fs = require('fs');
const path = require('path');
// const uuid = require("./helpers/uuid");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile('/public/index.html')
);

// GET 404 for anything that we don't have
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);




