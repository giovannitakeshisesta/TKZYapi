const createError = require("http-errors");
const DNDmenu = require("../models/DNDmenu.model");

// --------------------------------------------------------------------------------
// CREATE DNDmenu
module.exports.createDNDmenu = (req, res, next) => {
  DNDmenu.create({
    starters: { item: [] },
    main_courses: { item: [] },
    desserts: { item: [] },
    drinks: { item: [] },
  })
    .then((response) => res.status(201).json(response))
    .catch(next);
};

// --------------------------------------------------------------------------------
// GET DNDmenu,  populating each array of courses
module.exports.findDNDmenu = (req, res, next) => {
  const populateOptions = (eachColumn) => {
    return {
      path: eachColumn,
      populate: {
        path: "item",
        model: "MenuForm",
      },
    };
  };
  DNDmenu.find()
    .populate(populateOptions("starters"))
    .populate(populateOptions("main_courses"))
    .populate(populateOptions("desserts"))
    .populate(populateOptions("drinks"))
    .then((response) => res.status(200).json(response))
    .catch(next);
};

// --------------------------------------------------------------------------------
// UPDATE DNDmenu, everytime a product is dragged and dropped in an other position
module.exports.patchDNDmenu = (req, res, next) => {
  DNDmenu.findOneAndUpdate({}, req.body, { new: true })
    .then((response) => res.status(200).json(response))
    .catch(next);
};
