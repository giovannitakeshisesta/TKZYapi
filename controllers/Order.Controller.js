const createError = require("http-errors");
const Order = require("../models/Order.model");
const Holder = require("../models/Holder.model");

// --------------------------------------------------------------------------------
// --------------------------------- HOLDERS --------------------------------------
// --------------------------------------------------------------------------------
// CREATE GROUP OF HOLDERS
module.exports.createHolder = (req, res, next) => {
  Holder.create({
    New: [],
    First: [],
    Second: [],
    Done: [],
  })
    .then((response) => res.status(201).json(response))
    .catch(next);
};

// --------------------------------------------------------------------------------
// GET HOLDERS
// populate each hold with the Ids of the orders that contains
module.exports.getHolder = (req, res, next) => {
  Holder.find()
    .populate({ path: "New", model: "Order" })
    .populate({ path: "First", model: "Order" })
    .populate({ path: "Second", model: "Order" })
    .populate({ path: "Done", model: "Order" })

    .then((response) => res.status(200).json(response))
    .catch(next);
};

// --------------------------------------------------------------------------------
// UPDATE HOLDERS every time the position of the orders change
module.exports.putHolder = (req, res, next) => {
  Holder.findOneAndUpdate({}, req.body, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(next);
};

// --------------------------------------------------------------------------------
// ------------------------------------ ORDERS ------------------------------------
// --------------------------------------------------------------------------------
// CREATE ORDER and push it in the first hold
module.exports.createOrder = (req, res, next) => {
  Order.create(req.body)
    .then((order) => {
      return Holder.findOneAndUpdate(
        {},
        { $push: { New: order._id } },
        { new: true }
      ).then((response) => {
        res.status(201).json(response);
      });
    })
    .catch(next);
};

// --------------------------------------------------------------------------------
// UPDATE ORDER
module.exports.patchOrder = (req, res, next) => {
  // console.log(req.params.id, req.body)
  Order.findByIdAndUpdate(req.params.id, { order: req.body }, { new: true })
    .then((order) => res.status(200).json(order))
    .catch(next);
};

// --------------------------------------------------------------------------------
// DELETE ORDER
module.exports.deleteOrder = (req, res, next) => {
  Order.findByIdAndDelete(req.params.id)
    .then((order) => res.status(202).json(order))
    .catch(next);
};

// --------------------------------------------------------------------------------
// IS DONE 
// in a order ticket, allows to cross the products already done 
module.exports.editIsDone = (req, res, next) => {
  const orderId = req.params.id;
  const itemId = req.body.itemId;

  Order.findById(orderId)
    .then((response) => {
      const target = response.order.find((el) => el._id === itemId);
      target.isDone = !target.isDone;
      response.markModified("order");
      return response.save()
      .then((order) =>res.json(order));
    })
    .catch(next);
};


// --------------------------------------------------------------------------------
// GET ORDER
module.exports.getOrders = (req, res, next) => {
  Order.find()
    .then((result) => {
      const ordersArr = result.map(el => el.order)
      const ordersTable = ordersArr.map(el => el[0].table)
      res.status(200).json(ordersTable)
    })
    .catch(next);
};
