const createError = require("http-errors");
const MenuForm = require("../models/MenuForm.model");
const DNDmenu = require("../models/DNDmenu.model");

// --------------------------------------------------------------------------------
// CREATE
// create a new product and then push the Id in the related DNDmenu course array
module.exports.create = (req, res, next) => {
  // console.log("dentro controller Menu create", req.body, req.file);
  const newItem = req.body;
  if (req.file) {
    newItem.image = req.file.path;
  }
  let currentCourse = newItem.course;

  MenuForm.create(newItem)
    .then((element) => {
      return DNDmenu.findOneAndUpdate(
        {},
        { $push: { [`${currentCourse}.item`.toLocaleLowerCase()]: element.id } },
        { new: true }
      ).then(() => res.status(201).json(element));
    })
    .catch(next);
};

// --------------------------------------------------------------------------------
// GET ALL THE PRODUCTS
module.exports.find = (req, res, next) => {
  MenuForm.find()
    .then((response) => res.status(201).json(response))
    .catch(next);
};

// --------------------------------------------------------------------------------
// GET A SPECIFIC PRODUCT
module.exports.findByIdMenu = (req, res, next) => {
  // console.log("dentro controller findByIdMenu ", req.params.id);
  MenuForm.findById(req.params.id)
    .then((response) => {
      if (!response) {
        next(createError(404, "Id not found"));
      } else {
        res.status(200).json(response);
      }
    })
    .catch(next);
};

// --------------------------------------------------------------------------------
// UPDATE PRODUCT
// update the product details, if the course has changed, update the DNDmenu arrays too
module.exports.findByIdAndUpdate = (req, res, next) => {
  const itemId = req.params.id;
  const newItem = req.body;
  if (req.file) {
    newItem.image = req.file.path;
  }
  let currentCourse = newItem.course;

  MenuForm.findById(req.params.id)
    .then((response) => {
      const previosusCourse = response.course;
      if (previosusCourse !== currentCourse) {
        return DNDmenu.findOneAndUpdate({}, {$pull: {[`${previosusCourse}.item`.toLocaleLowerCase()]: itemId}},{ new: true })
          .then(() => DNDmenu.findOneAndUpdate({}, {$push: {[`${currentCourse}.item`.toLocaleLowerCase()]: itemId } },{ new: true }))
          .then(() => MenuForm.findByIdAndUpdate(req.params.id, newItem, {new: true,runValidators: true }))
          .then((response) => res.status(200).json(response));
      } else {
        MenuForm.findByIdAndUpdate(req.params.id, newItem, {new: true,runValidators: true })
        .then((response) => res.status(200).json(response));
      }
    })
    .catch(next);
};

// --------------------------------------------------------------------------------
// DELETE A PRODUCT
module.exports.findByIdAndDeleteMenu = (req, res, next) => {
  MenuForm.findByIdAndDelete(req.params.id)
    .then((response) => res.status(202).json(response))
    .catch(next);
};
