'use strict';
module.exports = function (app) {
    var userList = require('../controllers/userController');

    app.route('/users')
        .get(userList.list_all_users)
        .post(userList.create_a_user);

    app.route('/users/:userId')
        .get(userList.get_a_user)
        .delete(userList.delete_a_user);

    app.route('/users/addfriend')
        .post(userList.add_a_friend);

    app.route('/users/getfriends')
        .post(userList.get_friends);

    app.route('/users/commonfriends')
        .post(userList.get_common_friends);

    app.route('/users/follow')
        .post(userList.follow_a_user);

    app.route('/users/unfollow')
        .post(userList.unfollow_a_user);

    app.route('/users/getfollowers')
        .post(userList.get_all_followers);
};
