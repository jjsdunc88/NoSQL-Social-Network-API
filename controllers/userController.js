const { User, Thought } = require('../models')

module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one user
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userID }).select(
                "-__v"
            );

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}