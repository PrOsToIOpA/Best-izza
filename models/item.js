const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
   name: {type: String, required: true, unique: true},
   imageUrl: {type: String, required: true, unique: false},
   types: {type: Array, required: true, unique: false},
   sizes: {type: Array, required: true, unique: false},
   prices: {type: Object, required: true, unique: false},
   category: {type: Types.ObjectId, ref:'Categories', unique: false}
   
})

module.exports = model('Item', schema)

//{type: Types.ObjectId, ref:'Categories'}