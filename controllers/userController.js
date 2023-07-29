const { User, Thought } = require('../models')

module.exports = {

    // Get all Users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one User
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

    // Create a new User
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update existing User
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            res.json({ message: "User updated!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete User and thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            const thought = await Thought.deleteMany({
                username: user.username,
            });

            res.json({ message: "User deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add friend to User









}