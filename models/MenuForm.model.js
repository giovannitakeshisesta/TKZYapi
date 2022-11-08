const mongoose = require("mongoose");

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const MenuFormSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: ["Food", "Drink"],
        message: "Expected values :  Food or Drink.",
      },
      required: [true, "Required - Back message"],
    },
    name: {
      type: String,
      unique: true,
      trim: true,
      // lowercase: true,
      required: [true, "Required - Back message"],
    },
    price: {
      type: Number,
      required: [true, "Required - Back message"],
      min: [1, "the min is 1 - Back message"],
    },

    description: {
      type: String,
      required: [true, "Required - Back message"],
      minlength: [3, "minlength 3 characters - Back message"],
    },
    allergens: [],
    course: {
      type: String,
      enum: {
        values: ["Starters", "main_courses", "Desserts", "Drinks"],
        message: "Expected values : Starters, main_courses,Desserts,Drinks .",
      },
    },
    image: {
      type: String,
      required: [true, "Required - Back message"],
    },    
    quantity:{
      type:Number,
      default: 0
    },
    flow:{
      type:Number,
      default: 1
    }, 
    isDone:{
      type:Boolean,
      default:false
    },
  }
);

const MenuForm = mongoose.model("MenuForm", MenuFormSchema);

module.exports = MenuForm;











