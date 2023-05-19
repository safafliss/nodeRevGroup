var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require("mongoose");
var mongoConfig = require("./config/mongoConfig.json");
const http = require("http");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Msg = require('./chat/chatModel');
var chatRoutes = require("./routes/chatRoutes");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const bodyParser = require('body-parser')


var app = express();
app.use(express.json());

mongoose.connect(mongoConfig.uri,{ 
  useNewUrlParser: true ,
  useUnifiedTopology: true
  }).then(()=>{
      console.log("DB connected");
  }).catch(err=>{
      console.log(err);
  })

const server = http.createServer(app);
const io = require("socket.io")(server);
server.listen(3000, ()=> console.log("server is run"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chatCrud', chatRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on("connection", function(socket) {
  console.log ("User Connected..");
  socket.emit("msg","a new user is connected")
  socket.on("msg",(data)=>{
    io.emit("msg",data)
 })


 socket.on('disconnect', () => {
  console.log('user disconnected');
});


socket.on('msg', msg => {
  const message = new Msg({ 
      dateSent:new Date(),
      message:msg });
  message.save().then(() => {
      io.emit('message', msg)
  })
})
socket.on('typing', data => {
  socket.broadcast.emit('typing', data);
});
});


module.exports = app;
