const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
//var list=[]

//var url="https://www.udemy.com/course/insiders-guide-to-helpdesk-desktop-server-support/"
var url_list=["https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
              "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
              "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
              "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
              "https://www.udemy.com/course/the-web-developer-bootcamp/",
              "https://www.udemy.com/course/creativity-and-innovation-for-business/"]

var new_l=[]



function my_detail(err,resp,html){
  if (!err && resp.statusCode == 200){
    const $ = cheerio.load(html);
    const siteHeading = $('.row');

    const output = siteHeading.find('h1').text().replace("\n",'');


    const image = $('.introduction-asset img').attr('src')
    console.log(image)
    console.log(output)


     const details={
      img:image,
      name:output
    }
      return details
  }

}
async function test() {
  for (var i=0,l=url_list.length;i<l;i++){
    p = await request(url_list[i],my_detail)
    new_l.push(p)
  }
  console.log(new_l)
}
test();



// function my_detail(new_l,url_list) {
//
//   for (var i=0,l=url_list.length;i<l;i++){
//
//   request(url_list[i],(err, resp, html) =>{
//     if (!err && resp.statusCode == 200){
//       const $ = cheerio.load(html);
//       const siteHeading = $('.row');
//
//       output = siteHeading.find('h1').text().replace("\n",'');
//
//
//       image = $('.introduction-asset img').attr('src')
//       console.log(image)
//       console.log(output)
//
//
//        var details={
//         img:image,
//         name:output
//       }
//
//     }
//   })
// }

// return new_l
// }
// const item=my_detail(new_l,url_list)
// console.log(item)
