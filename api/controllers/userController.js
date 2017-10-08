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


//Add friends relationship between two users.
exports.add_a_friend = (req, res) => {
    if (req.body.requestor && req.body.target) {
        res.status(200).send("OK");

    } else {
        res.status(400).send("wrong parameters!")
    }
};

//Get user friend list by email
exports.get_friends = (req, res) => {
    if (req.body.email) {
        res.status(200).send("OK");
    } else {
        res.status(400).send("wrong parameters!")
    }
}


//Get common user between two users
exports.get_common_friends = (req, res) => {
    if (req.body.users && req.body.users.length == 2) {
        res.status(200).send("OK");
    } else {
        res.status(400).send("wrong parameters!")
    }
}

//subscribe user's updates by following a user
exports.follow_a_user = (req, res) => {
    if (req.body.requestor && req.body.target) {
        res.status(200).send("OK");
    } else {
        res.status(400).send("wrong parameters!")
    }
}

//unsubscribe user's updates by unfollowing a user
exports.unfollow_a_user = (req, res) => {
    if (req.body.requestor && req.body.target) {
        res.status(200).send("OK");
    } else {
        res.status(400).send("wrong parameters!")
    }
}

//Get user's all followers in order to push feeds
exports.get_all_followers = (req, res) => {
    if (req.body.sender) {
        res.status(200).send("OK");
    } else {
        res.status(400).send("wrong parameters!")
    }
}


