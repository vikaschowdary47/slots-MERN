const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')


// Routes
const slotRoute = require('./routes/slot')

// middleware
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));


dotenv.config();

// connect to database

mongoose.connect(
    process.env.ATLAS_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('connected to mongodb database')
)

// route middleware
app.use('/api/slot', slotRoute);


const port = process.env.PORT || 9000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client','build','index.html'));
    })
}

app.listen(port, () => {
    console.log(`server running at ${port}`)
})