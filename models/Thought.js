const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      max_length: 50,
    },
    thought: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
