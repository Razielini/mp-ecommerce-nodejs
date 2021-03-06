var express = require('express');
var exphbs = require('express-handlebars');
const MercadoPagoController = require('./controller/MercadoPagoController');
const MercadoPagoService = require('./services/MercadoPagoService');
const MercadoPagoInstance = new MercadoPagoController(new MercadoPagoService());

var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});


app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.post('/checkout', urlencodedParser, function (req, res) {
    MercadoPagoInstance.getMercadoPagoLink(req, res);
});

app.post("/webhook", (req, res) => MercadoPagoInstance.webhook(req, res));

app.post("/notifications", (req, res) => MercadoPagoInstance.notifications(req, res));

app.listen(process.env.PORT || 5000, () => {
    console.log('Running on http://localhost:5000');
});