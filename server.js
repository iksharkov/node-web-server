const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

// app.use((req, res, next) =>{
//     res.render('maintnes.hbs', {
//         pageTitle: 'maintnes',
//         message: 'we will be back soon'
//     })
// });

app.use(express.static(__dirname + '/public'));
// helpers 
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('scremIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    // res.send('<h1> Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'wellcome here',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'projects page'
    });
});

app.get('/contact', (req,res) => {
    res.render('contact.hbs', {
        pageTitle:'contact page'
    });
});

app.get('/bad', (req,res) => {
    res.send ({
        errorMassage:'Unable to load page!'  
    });
});


app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});