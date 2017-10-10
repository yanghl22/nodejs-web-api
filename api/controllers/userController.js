'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    intersect = require('intersect');

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
        User.findOne({ email: req.body.requestor }, (err, requestor) => {
            if (err)
                res.send(err);
            if (requestor) {
                User.findOne({ email: req.body.target, friends: { $nin: [requestor._id] } }, (err, target) => {
                    if (err) res.send(err);
                    if (target) {

                        //Add target to requestor's friend list
                        User.findByIdAndUpdate(requestor._id,
                            { "$push": { "friends": target._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                        //Add target to requestor's followed list
                        User.findByIdAndUpdate(requestor._id,
                            { "$push": { "followed": target._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                        //Add requestor to target's friend list
                        User.findByIdAndUpdate(target._id,
                            { "$push": { "friends": requestor._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                        //Add requestor to target's friend list
                        User.findByIdAndUpdate(target._id,
                            { "$push": { "followed": requestor._id } },
                            { "new": true, "upsert": true },
                            (err, user) => {
                                if (err)
                                    res.send(err);
                            });

                    } else {
                        res.status(404).send("Requester and targeted user are friends already, or targeted user does not exist!");
                    }

                    res.status(200).json({
                        success: true
                    });
                });

            } else {
                res.status(404).send("Requested user does not exist!");
            }
        });

    } else {
        res.status(400).send("wrong parameters!");
    }
};

//Get user friend list by email
exports.get_friends = (req, res) => {
    if (req.body.requestor) {
        User.findOne({ email: req.body.requestor }, (err, user) => {
            if (err) res.send(err);
            if (user) {
                User.find({ _id: { $in: user.friends } }).select("email -_id")
                    .exec((err, friends) => {
                        if (err) res.send(err);
                        if (friends && friends.length > 0) {
                            friends = friends.map(x => x.email);
                            res.json({
                                success: true,
                                friends: friends,
                                count: friends.length
                            });
                        } else {
                            res.status(200).send("Requested user has no friends yet!")
                        }
                    });
            } else {
                res.status(404).send("Requested user does not exist")
            }

        });
    } else {
        res.status(400).send("wrong parameters!")
    }
}


//Get common user between two users
exports.get_common_friends = (req, res) => {
    if (req.body.users && req.body.users.length == 2) {
        User.findOne({ email: req.body.users[0] }, (err, first) => {
            if (err) res.send(err);
            if (first) {
                User.findOne({ email: req.body.users[1] }, (err, second) => {
                    if (err) res.send(err);
                    if (second) {
                        let firstFriends = JSON.parse(JSON.stringify(first.friends));
                        let secondFriends = JSON.parse(JSON.stringify(second.friends));
                        let commonFriends = intersect(firstFriends, secondFriends);

                        User.find({ _id: { $in: commonFriends } }).select("email -_id")
                            .exec((err, friends) => {
                                if (err) res.send(
                                    err);
                                friends = friends.map(x => x.email);
                                res.json({
                                    success: true,
                                    friends: friends,
                                    count: friends.length
                                });
                            });

                    } else {
                        res.status(404).send("The second user does not exist")
                    }
                });

            } else {
                res.status(404).send("The first user does not exist")
            }
        });
    } else {
        res.status(400).send("wrong parameters!")
    }
}

//subscribe user's updates by following a user
exports.follow_a_user = (req, res) => {
    if (req.body.requestor && req.body.target) {
        User.findOne({ email: req.body.target }, (err, target) => {
            if (err) res.send(err);

            if (target) {
                User.findOne({ email: req.body.requestor, followed: { $nin: [target._id] } }, (err, requestor) => {
                    if (err) res.send(err);
                    User.findByIdAndUpdate(requestor._id,
                        { "$push": { "followed": target._id } },
                        { "new": true, "upsert": true }, (err, user) => {
                            if (err)
                                res.send(err);
                        });

                    res.status(200).json({ success: true });
                });
            }
            else {
                res.status(404).send("The targeted user does not exist!")
            }

        });
    } else {
        res.status(400).send("wrong parameters!")
    }
}

//unsubscribe user's updates by unfollowing a user
exports.unfollow_a_user = (req, res) => {
    if (req.body.requestor && req.body.target) {
        User.findOne({ email: req.body.target }, (err, target) => {
            if (err) res.send(err);
            if (target) {
                User.findOne({ email: req.body.requestor, followed: { $in: [target._id] } }, (err, requestor) => {
                    if (err) res.send(err);

                    User.findByIdAndUpdate(requestor._id,
                        { "$pull": { "followed": target._id } },
                        { "new": true, "upsert": true }, (err, user) => {
                            if (err)
                                res.send(err);
                        });

                    res.status(200).json({ success: true });
                });
            } else {
                res.status(404).send("The targeted user does not exist!")
            }

        });
    } else {
        res.status(400).send("wrong parameters!")
    }
}

//Get user's all followers in order to push feeds
exports.get_all_followers = (req, res) => {
    if (req.body.sender) {
        User.findOne({ email: req.body.sender }, (err, sender) => {
            if (err) res.send(err);
            if (sender) {
                User.find({ followed: { $in: [sender._id] } }).select("email -_id")
                    .exec((err, followers) => {
                        if (err) res.send(err);
                        res.json({
                            success: true,
                            recipients: followers,
                            count: followers.length
                        });
                    });
            } else {
                res.status(404).send("The requested user does not exist!")
            }

        });
    } else {
        res.status(400).send("wrong parameters!")
    }
}
