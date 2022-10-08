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
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
)
// reactionId
    // Use Mongoose's ObjectId data type
    // Default value is set to a new ObjectId

// reactionBody
    // String
    // Required
    // 280 character maximum

// username
    // String
    // Required

// createdAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query


// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
            // Must be between 1 and 280 characters
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
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
)
// thoughtText
    // String
    // Required
    // Must be between 1 and 280 characters
    
// createdAt
    // Date
    // Set default value to the current timestamp
    // Use a getter method to format the timestamp on query
    
// username (The user that created this thought)
    // String
    // Required
    
// reactions (These are like replies)
    // Array of nested documents created with the reactionSchema

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;