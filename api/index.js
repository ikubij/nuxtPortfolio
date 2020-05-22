const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./posts');

app.use('/api/posts', posts);

module.exports={
    path: "/",
    handler: app
};

// Handle production
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(__dirname + '/public/'));

//   // Handle SPA
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

// const port = process.env.PORT || 5000;
// const port = process.env.PORT;
// app.listen(port, () => console.log(`Server started on port ${port}`));

// var express = require("express");
// var app=express();

// app.get("/",function(req,res){
//     res.send("hello world");
// })

// module.exports={
//     path: "/api/",
//     handler: app
// };