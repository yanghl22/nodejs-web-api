'use strict';
module.exports = function (app) {
    const userList = require('../controllers/userController');

    app.route('/users')
        .get(userList.list_all_users);

    app.route('/register')
        .post(userList.create_a_user);

    app.route('/user/:userId')
        .get(userList.get_a_user)
        .delete(userList.delete_a_user);

    app.route('/user/addfriend')
        .post(userList.add_a_friend);

    app.route('/user/getfriends')
        .post(userList.get_friends);

    app.route('/user/commonfriends')
        .post(userList.get_common_friends);

    app.route('/user/follow')
        .post(userList.follow_a_user);

    app.route('/user/unfollow')
        .post(userList.unfollow_a_user);

    app.route('/user/getfollowers')
        .post(userList.get_all_followers);

};
