const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Subdocument schema for reaction fields
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,        
            get: createdAtTime => moment(createdAtTime).format("MMM DD, YYYY [at] hh:mm a"),
        }    
    },
    {
        // Indicates that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
)

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,        
            get: createdAtTime => moment(createdAtTime).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        // Indicates that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
)

// Virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;