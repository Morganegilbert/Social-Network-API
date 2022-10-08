const { Schema, model, Types } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, "Please use a valid email address",],
        },

        // array of _id values referencing the User model (self-reference)
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
    
        // array of _id values referencing the User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        // Indicates that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
)

// Virtual property `friendCount` tht retrieves the length of the user's friends array field on query
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;