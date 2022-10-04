// username
    // String
    // unique
    // required
    // trimmed

// email
    // String
    // required
    // unique
    // must match a valid email address (look into Mongoose's matching validation)

// thoughts
    // array of _id values referencing the User model (self-reference)


// friends
    // array of _id values referencing the User model (self-reference)

// Create a virtual property `friendCount` tht retrieves the length of the user's friends array field on query
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