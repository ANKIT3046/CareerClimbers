const mongoose = require('mongoose');
const validator = require('validator');
const Courses = mongoose.model('Courses',{
  img:{
    type:String,
    required:true,
  },
  name:{
    type:String,
    required:true
  },
  link:{
    type:String,
    reqired:true
  }
})


module.exports=Courses
