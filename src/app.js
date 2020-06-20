const express = require('express')
require('./db/mongoose');
const Courses = require('./models/courses');
const path = require('path')
const hbs = require('hbs')
const course_list = require('./utils/course_list');
//const passing = require('./utils/test.js');
const testJS = require('./utils/test.js');
//const getData = require('./utils/test.js')
//------------
const List = require('./models/list_to_store');
const Store_details = require('./models/detail')
//-----------
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
// Install node-fetch before running the code using the command- "npm install --save node-fetch"
const fetch = require('node-fetch')
//-------------




const app = express()

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
 // Static Directory to serve

app.use(express.static(publicDirectoryPath));

app.use(express.json())


// var url_list=["https://www.udemy.com/course/insiders-guide-to-helpdesk-desktop-server-support/?couponCode=JUNE2020",
//               "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
//               "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
//               "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
//               "https://www.udemy.com/course/the-web-developer-bootcamp/",
//               "https://www.udemy.com/course/creativity-and-innovation-for-business/"]


//topic-menu__items topic-menu__item topic-menu__link
//


// app.get('',(req,res,next) =>{
//   async function my_detail(html,url){
//       try{
//           const $ = await cheerio.load(html);
//           const siteHeading = $('.row');
//
//           const output = siteHeading.find('h1').text().replace("\n",'');
//
//           const image = $('.introduction-asset img').attr('src')
//
//           // console.log(image)
//           // console.log(output)
//
//
//           const details={
//           img:image,
//           name:output,
//           link:url
//           }
//           return await details
//       }catch(e){
//           console.log("ERROR: Could not parse")
//           return null
//       }
//   }
// getDataFromURL(url_list)
// async function getDataFromURL(url_list){
//     var new_l=[]
//     // for every link. fetch the data, get the html response and pass it to my_detail function to get name and img
//     url_list.forEach(url=>{
//         fetch(url)
//         .then(res=> res.text())
//         .then(html=>my_detail(html,url))
//         .then(detail=>new_l.push(detail))
//
//     })
//
//     setTimeout(function(){
//         p={courses:new_l}
//         res.render('index',p)
//         console.log(p)
//     },4000)
// }
//
//     //res.render('index',course_list)
//
// })


//-------------------------------------------------------------------------------------//

//-------------------this is for admin only field for udemy courses---------------------------------
app.post('/admin',async (req,res) =>{
  const link =new List(req.body)
  string=link.link
  var res = string.toString().split("?")
  console.log(res)
  axios.get(link.link).then(function(response){
    const $ = cheerio.load(response.data)
    title = $('h1.clp-lead__title').html();
    image = $('.introduction-asset img').attr('src')

    var tag=[]
    $('.topic-menu__items').find('a').each(function (index,element){
      tag.push($(element).text())
    })
    console.log(tag[1])
//topic-menu__items topic-menu__item topic-menu__link

    const details = new Store_details({
      img:image,
      link:link.link,
      name:title,
      tag:tag[1],
      couponCode:res[1]
    });


    details.save()
  })
  try {
    await link.save()

    res.send(201).send(details)


  } catch (e){
    //res.sendStatus(400)
    res.status(400).send(e)
  }
})


app.get('/total_courses',function (req,res){
  Store_details.count({}, function(err,result){
    if(err){
      console.log(err)
    } else {
      res.json("number: "+result)
    }
  })
})

app.get('', async (req,res,next) =>{
  try {
    const details = await Store_details.find({})
    console.log(details)
    let my_list = {course:details}
    //console.log(my_list)

    res.render('index',my_list)
  } catch (e){
    res.status(500).send()
  }
})

//-------------------------------------------------------------------//
//--------------------end test field ----------------------------

//-------------------------------------------------------------------//
//--------------this is for non udemy courses --------------------//
app.post('/courses', async (req,res) =>{
  // console.log(req.body)
  // res.send('testing')
  const course = new Courses(req.body)

  try {
    await course.save()
    res.send(201).send(course)
  } catch (e){
    res.status(400).send(e)
  }
})

app.get('/additional_course', async (req,res,next) =>{

  try {
    const course =await Courses.find({})
    //res.send(course)
    //console.log(course)
    let list={cu:course}
    //console.log(abc)
    res.render('additional_course',list)

  } catch (e){
    res.status(500).send()
  }
})



app.delete('/courses/:id', async (req,res) =>{
  try{
    const course =await Courses.findByIdAndDelete(req.params.id)
    if(!course){
      return res.status(404).send()
    }
    res.send(course)
  } catch (e){
    res.status(500).send(e)
  }
})

//---------------------------------------------------//


//------------------this is logic for facting udemy course data in real time-----------//
//------by scrapping ------------------------------//
app.get('/demo_route', async (req, res) => {
  let courseList = await testJS(url_list);
  console.log(courseList);
  res.send(courseList);
})

//---------------------------------------//

///-------------------------individual course details route----------------------------//

app.get('/course_details/:id', async (req, res) =>{
  const _id =req.params.id
  const details =await Store_details.findById(_id)
  url=details.link
  axios.get(url)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      title =$('h1.clp-lead__title').html();
      learning =$('.what-you-get__items')
                  .find('.what-you-get__text')
                  .contents().toArray()

      description = $('div.clp-component-render div.description div.js-simple-collapse-inner').html();
      image = $('.introduction-asset img').attr('src')
      content = $('.curriculum-wrapper')
                  .find('.section-title-text')
                  .contents()
                  .toArray()
    })
    .catch(function (error) {
      console.log(error);
    })
    .then (function () {
      console.log(title)
      console.log(learning)
      console.log(description)
    })
    // details are stored are stord in all above variable use in the template as a variable and pass it in render function
})

///-----------------------------------------------------------------------------------//
app.listen(3000, () =>{
  console.log('Serever is running on port 3000');
})
