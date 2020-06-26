const mongoose = require('mongoose')

const List = mongoose.model('List', {
  link:{
    type:String,
    required:true
  }
})


module.exports = List
