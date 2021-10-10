const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = 3000;
const authRoutes = require('./routes/authRoutes');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
// make static file
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

// connect mongodb
const dbURI = "mongodb+srv://LamBui:Abc123$$$@nodelearn.kle7b.mongodb.net/NodeAuth?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => app.listen(port))
    .catch(err => console.log(err));

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth , (req, res)=> res.render('smoothies'));
app.use(authRoutes);