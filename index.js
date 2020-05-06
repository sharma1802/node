const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app  = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', 'src/view');
app.set('view engine', 'hbs');


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get('/home', (req, res)=>{
    res.render('home', { list: ['Atul', 'Bikash'],name: 'atul', inClass: true });
})

var PLAYERS = [];
app.post("/players", function(request, response) {
   var newDataFromBrowser = {
       name: request.body.name,
       country: request.body.country
   };
   PLAYERS.push(newDataFromBrowser);
   response.json(newDataFromBrowser);
});

app.listen(3000);