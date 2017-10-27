'use strict';
const jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.auth_user = (req, res) => {
    console.log(req.body.email);
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.json({ sucess: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (user.password != req.body.password) {
                console.log(req.body.password);
                console.log(user.email + ' ' + user.password);
                res.json({ sucess: false, message: 'Authentication failed.Wrong password.' });
            } else {
                const payload = {
                    userId: user._id
                }
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 1440 });
                res.json({ success: true, token: token });
            }

        } else {

        }
    })
}


exports.auth_token = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json({ sucess: false, message: 'Failed to authenticate the token' })
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).send({ success: false, message: 'No taken provided' });
    }

}