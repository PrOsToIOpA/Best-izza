const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   name: {type: String, required: true, unique: false},
   phone: {type: String, required: true, unique: false},
   adress: {type: String, required: true, unique: false},
   goods: {type: Array, required: true, unique: false},
   totalCount: {type: String, required: true, unique: false},
   totalPrice: {type: String, required: true, unique: false},
   user: {type: Types.ObjectId, ref:'Users', unique: false}
   
})

module.exports = model('Order', schema)