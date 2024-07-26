var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var models = require('./models');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var lessonOrderRouter = require('./routes/lessonOrderRoutes');
var scheduleRouter = require('./routes/scheduleRoutes');
var studentRouter = require('./routes/studentRoutes');
var teacherRouter = require('./routes/TeacherRoutes');

var app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Set the view engine to Pug (Jade)
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Use the routers
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lessonOrders', lessonOrderRouter);
app.use('/schedules', scheduleRouter);
app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);

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

models.sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing database:', err);
    });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
