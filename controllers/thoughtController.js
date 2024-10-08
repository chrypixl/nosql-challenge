const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('users');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('users');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a course
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.courseId });

      if (!thought) {
        res.status(404).json({ message: 'No course with that ID' });
      }

      await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: 'Thought and users deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a course
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {

      const reactionRemove = await Thought.findOneAndUpdate(
        { reactions: req.params.reactionId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      res.json({ message: 'Reaction successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {

      const reactionAdd = await Thought.findOneAndUpdate(
        { reactions: req.params.reactionId },
        { $add: { reactions: req.params.reactionId } },
        { new: true }
      );

      res.json({ message: 'Reaction successfully added' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
