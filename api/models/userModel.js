'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: 'Kindly enter the email address!'
    },
    name: {
        type: String,
	trim: true,
        required: 'Kindly enter your user name!'
    },
    profession: {
        type: String,
	trim: true
    },
    friends: [{
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }],
    followed: [{
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }],
    create_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);
