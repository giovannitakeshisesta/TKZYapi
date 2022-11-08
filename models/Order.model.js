const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
{
    order:[]
},
{
    timestamps: true
}
)

const Order = mongoose.model('Order',orderSchema)

module.exports = Order