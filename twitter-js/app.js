const express = require( 'express' );
const nunjucks = require( 'nunjucks' );
const app = express(); // creates an instance of an express application

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

const routes = require('./routes');
app.use('/', routes);

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
  console.log(req.method, req.url);
  next();
})

app.use(express.static('public'));

// app.get('/stylesheets/style.css', function (req, res) {
//   res.sendFile(__dirname + '/public/stylesheets/style.css');
// });

// app.get('/', function (req, res) {

//   const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render( 'index', {title: 'Hall of Fame', people: people} );

// })

app.listen(3000, function(){
  console.log('server listening');
});


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates

nunjucks.render('index.html', locals, function (err, output) {
    console.log(output);
});

