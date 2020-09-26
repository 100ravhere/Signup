const express = require("express");
const app = express();
const bodyparser  = require("body-parser");
const request = require("request");
const https = require("https");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.post("/failure",function(req,res)
{
  res.redirect("/");
})
app.post("/",function(req,res)
{
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const data = {
    members :[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:
        {
          FNAME : firstname,
          LNAME : lastname
        }
      }
    ]
  };

  const url = "https://us2.api.mailchimp.com/3.0/lists/be38287c0d"
  const jsondata = JSON.stringify(data);
  const options = {
    method:"POST",
    auth:"100rav:d392774f645af62cf03a92255c5df4ce-us2"
  }
  const request = https.request(url,options,function(response)
{
  if(response.statusCode==200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else {
    {
      res.sendFile(__dirname+"/failure.html");
    }
  }
response.on("data",function(data)
{
  console.log(JSON.parse(data));
})
})
request.write(jsondata);
request.end();
})
app.listen(process.env.PORT || 3000,function()
{
  console.log("Server started");
});
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
//API Key
//d392774f645af62cf03a92255c5df4ce-us2
//List ID
//be38287c0d
