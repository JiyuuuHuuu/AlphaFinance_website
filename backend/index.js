const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const app = express();
app.use(cors())

//TODO: you need to configure how to connect to DB here.
var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'gjq19960421',
    database:'alpha_finance',
})


app.get('/login', (req, res) => {
  console.log("I am about to login", req.query["username"])
  // TODO: please finish this part
  // If the username and password is correct, return with username as message. Else return a empty string in message
  return res.json({message: req.query["username"]});
})



app.get('/visit', (req, res) => {
  console.log("I am about to visit", req.query["selectedStock"])
  // TODO: please finish this part
  // Return the new recent view list
  const sampleNewRecentView = [{symbol:"UP"}, {symbol:"DA"}, {symbol:"TE"}, {symbol:"d"}];
  return res.json({message: sampleNewRecentView});
})

app.get('/filter', (req, res) => {
  console.log("I am about to filtered", req.query["filterList"])
  // TODO: please finish this part
  // Return the filtered recent view list
  // const stockIndustry=["Airlines", "Tech"].toString();
  console.log("filter list: ", req.query["filterList"])
  if (req.query["filterList"].length == 0){
    // If it is initailization, send back a string message
    return res.json({message: "initailization"});
  }else{

  }
  const sqlSelect = "SELECT * FROM stocks WHERE symbol LIKE '%AA%'";
  db.query(sqlSelect, (err, result) => {
      // response.send(result);
    console.log("SQL command: ", sqlSelect)
    if (err) console.log(err);
    return res.json({message: result});
  });
})

app.get('/search', (req, res) => {
  console.log("I am about to search", req.query["searchquery"])
  // TODO: please finish this part
  // Update the list of query with the search keywords
  if (req.query["searchquery"].length == 0){
    // If it is initailization, send back a string message
    return res.json({message: "initailization"});
  }else{
    // Else send
    const stockSymbol = req.query["searchquery"];
    const sqlSelect = `SELECT * FROM stocks WHERE symbol LIKE \"%${stockSymbol}%\"`;
    db.query(sqlSelect, (err, result) => {
        // response.send(result);
      console.log("SQL command: ", sqlSelect)
      if (err) console.log(err);
      return res.json({message: result});
    });
  }

})


// app.get("/api/get", (require, response) => {
//     const sqlSelect = "SELECT * FROM movie_reviews";
//     db.query(sqlSelect, (err, result) => {
//         response.send(result);
//     });
// });
//
// app.post("/api/insert", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;
//
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//         console.log(error);
//     })
// });

app.listen(4000, ()=>{
  console.log("backend listening on 4000")
})
