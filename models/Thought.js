const { Schema, model } = require('mongoose');

// Subdocument schema for reaction fields
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default:
        },
    },
    {
        reactionBody: {
            type: string,
            required: true,
            // 280 character maximum
        },
    },
    {
        username: {
            type: string,
            required: true,
        },
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,        
            // Use a getter method to format the timestamp on query
        }    
    }
),
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
            type: string,
            required: true,
            // Must be between 1 and 280 characters
        }
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,        
            // Use a getter method to format the timestamp on query
        }
    },
    {
        username: {
            type: string,
            required: true,
        }
    },
    {
        reactions: {
            // Array of nested documents created with the reactionSchema
        }
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
    return this.reaction.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;