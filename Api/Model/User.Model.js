const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String,required:true},
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
 
    password: { type: String, required: true },
    mobile: {
        type: Number,
        required: true,
        // validate: {
        //     validator: function(v) {
        //         return /d{10}/.test(v);
        //     },
        //     message: '{VALUE} is not a valid 10 digit number!'
        // }
    }

});

module.exports = mongoose.model('User',UserSchema);