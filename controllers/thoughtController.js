const { Thought, User } = require('../models');

module.exports = {

    // Get all Thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one Thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId,
            }).select("-__v");

            if (!thought) {
                return res.status(404).json({ message: "Thought not found!" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create Thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "Thought created, User not found!" });
            }
            res.json({ message: "Thought created!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Update Thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: "Thought not found!" });
            }
            res.json({ message: "Thought updated!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete Thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({
                _id: req.params.thoughtId,
            });

            if (!thought) {
                return res.status(404).json({ message: "Thought not found!" });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            res.json({ message: "Thought deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add reaction to Thought 
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true } 
            );

            if (!thought) {
                return res.status(404).json({ message: "Thought not found!" });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove reaction from Thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: "Thought not found!" });
            }

            res.json({ message: "Reaction deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};  



















