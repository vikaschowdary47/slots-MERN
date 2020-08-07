const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('Slot', slotSchema);