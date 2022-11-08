const mongoose = require('mongoose')

const holderSchema = new mongoose.Schema(
{ 
    New: [mongoose.Schema.Types.ObjectId],
    First: [mongoose.Schema.Types.ObjectId],
    Second: [mongoose.Schema.Types.ObjectId],
    Done: [mongoose.Schema.Types.ObjectId]
}
)

const Holder = mongoose.model('Holder',holderSchema)

module.exports = Holder