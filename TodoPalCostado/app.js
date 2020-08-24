var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var recordameMiddleware = require('./middlewares/recordameMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret'}));
app.use(methodOverride('_method'));
app.use(recordameMiddleware);
app.use(function(req, res, next){
  if(req.session.usuarioLogueado){
    res.locals.user = req.session.usuarioLogueado;
    res.locals.admin = req.session.usuarioLogueado.admin;
    res.locals.favoritos = req.session.favoritos;
  } else {
    res.locals.user = undefined;
  }
  if(req.session.cart){
    res.locals.cart = req.session.cart;
    res.locals.total = req.session.total;
  } else {
    res.locals.cart = [];
    res.locals.total = undefined;
  }
  next();
});



// Usamos los js de la carpeta routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);


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

module.exports = app;
