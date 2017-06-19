const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./route/route');
// app.get('/',(req,res)=>{
// 	res.send('Hello');
// });
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(serveStatic(path.join(__dirname, 'public')));
app.use('/todo',routes);

app.listen('3000',function(){
	console.log('ok');
	console.log('打开浏览器,localhost:3000');
});