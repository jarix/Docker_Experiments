const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/app',
  // mongo config when working with docker
  { useNewUrlParser: true }
)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

// Home 
app.get('/', (req, res) => {
  console.log("home request");
  
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

// Add Item to MicroBlog
app.post('/item/add', (req, res) => {
  
  const newItem = new Item({
    
    name: req.body.name,
    post: req.body.post
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000

// Listening on port
app.listen(port, () => console.log('Listening on port #: ', port));
