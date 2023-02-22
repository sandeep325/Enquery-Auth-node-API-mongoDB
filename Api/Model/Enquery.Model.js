const mongoose = require("mongoose");

const EnquerySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    GuestName: { type: String, required: true },
    Email: {
        type: String,
        maxlength: 50,
        required: true,
        // unique: true,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    Phone: {
        type: Number,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },
    Country: {
        type: String,
        maxlength: 25,
        required: true,
        uppercase: true,
    },
    State: {
        type: String,
        maxlength: 25,
        uppercase: true,
    },
    Zipcode: {
        type: String,
        maxlength: 12,
        required: true,
        uppercase: true,
    }
});
module.exports = mongoose.model('Enquery', EnquerySchema);
