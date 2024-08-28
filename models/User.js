const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: [{
      type: Schema.Types.ObjectId, ref: 'thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId, ref: 'user'
    }],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'student',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
);

const User = model('user', userSchema);

module.exports = User;
