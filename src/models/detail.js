const mongoose = require('mongoose')

const Store_details =mongoose.model('Store_details',{
  img:{
    type:String,
    required:true
  },
  link:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  tag:{
    type:String,

  },
  couponCode:{
    type:String,
  }
})
module.exports = Store_details
