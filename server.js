require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser= require('body-parser');


const productController = require('./controllers/productController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "mainLayout", runtimeOptions: {allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true,}}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Expresse démarre sur le port 3000');
});

app.use('/product', productController);