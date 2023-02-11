const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  console.log("localhost:4000 app.post")
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  console.log("app.post title:",title)
  posts[id] = {
   id,
   title
  };
  console.log("posts:",posts)

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
