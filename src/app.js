const express = require('express');
const hbs = require("hbs");  //handlebar template for views
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000    //define port dynamic

//this variable is containg the path starting from the system till public folder
const publicStaticDirPath = path.join(__dirname, '../public') 

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); //all html files are in the form of handlebars
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath)); //now express app knows our all static files are in public folder

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    const address = req.query.address     //query is something written after ? in req parameter
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
    //call another endpoint
    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

//if unvalid endpoint is searched
//this route should come at the end after all the routes
app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})