const mongoose = require('mongoose');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://127.0.0.1:27017/my_courses');

// const Courses = mongoose.model('Courses',{
//   img:{
//     type:String,
//     required:true,
//   },
//   name:{
//     type:String,
//     required:true
//   },
//   link:{
//     type:String,
//     reqired:true
//   }
// })
// const me = new Courses({
//   img:"fghj",
//   name:"rkf",
//   link:"jdi"
// })
// me.save().then(()=>{
//   console.log(me)
// }) .catch((error)=>{
//   cosole.log('Error! ',error)
// })
