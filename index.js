require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require ('path')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname,"assets")));

app.set('view engine','ejs');


app.use(express.json());

app.use(cors());

const port = process.env.API_PORT;

const pontoController = require('./controllers/PontoController');

app.post('/pontos', pontoController.addPonto);

app.get('/pontos',pontoController.renderPontos);

app.get('/',(req,res)=>{ res.render('index')},pontoController.sincronizar);

app.get('/sobre',(req,res)=>{
    res.render('sobre')});

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});