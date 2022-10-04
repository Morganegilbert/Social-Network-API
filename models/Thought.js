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
// userSchema
//   .virtual('fullName')
//   // Getter
//   .get(function () {
//     return `${this.first} ${this.last}`;
//   })
//   // Setter to set the first and last name
//   .set(function (v) {
//     const first = v.split(' ')[0];
//     const last = v.split(' ')[1];
//     this.set({ first, last });
//   });