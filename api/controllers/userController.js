'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('Users');

//List out all users from MongoDB
exports.list_all_users = (req, res) => {
    User.find({}, (err, users) => {
        if (err)
            res.send(err);

        res.status(200).json(users);
    });
}

//Create a new user by request body data
exports.create_a_user = (req, res) => {
    let new_user = new User(req.body);
    new_user.save((err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};

//Get user by userId
exports.get_a_user = (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err)
            res.send(err);
        res.json(user);
    });
};


//Delete user by userId
exports.delete_a_user = (req, res) => {
    User.findByIdAndRemove(req.params.userId,
        (err, user) => {
            if (err)
                res.send(err);
            res.json({ message: 'User successfully deleted' });
        });
};

