const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'Username is required'], // Make sure username is provided
      unique: true,
      trim: true, // Removes leading/trailing spaces
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Make sure email is provided
      unique: true,
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes leading/trailing spaces
    },
    password: {
      type: String,
      required: [true, 'Password is required'], // Make sure password is provided
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);



const Users=mongoose.model('User',userSchema)

module.exports=Users
