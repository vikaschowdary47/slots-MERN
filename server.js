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
    process.env.MONGO_URI || 'mongodb+srv://vikas28:vikas28@cluster0.izv2q.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('connected to mongodb database')
)

// route middleware
app.use('/api/slot', slotRoute);


const port = process.env.PORT || 9000;


    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })


app.listen(port, () => {
    console.log(`server running at ${port}`)
})