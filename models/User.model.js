const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required back message'],
      trim: true,
      lowercase: true,
      match: [EMAIL_PATTERN, 'Email has to be valid back message']
    },
    name: {
      type: String,
      required: [true, 'Name is required back message']
    },
    password: {
      type: String,
      required: [true, 'Password is required back message'],
      minlength: [8, 'Password must have at least 8 characters back message']
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
)

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then(hash => {
        this.password = hash

        next()
      })
  } else {
    next()
  }
})

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User