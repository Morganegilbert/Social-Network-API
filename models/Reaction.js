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


// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
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