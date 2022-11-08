const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "MenuForm",
  }
});

const DNDmenuSchema = new mongoose.Schema({
  starters: itemSchema,
  main_courses: itemSchema,
  desserts: itemSchema,
  drinks: itemSchema,
});

const DNDmenu = mongoose.model("DNDmenu", DNDmenuSchema);

module.exports = DNDmenu;
