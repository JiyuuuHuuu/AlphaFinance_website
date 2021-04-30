const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

//TODO: you need to configure how to connect to DB here.

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
  const sampleUpdatedListOfStock = [
    {
      symbol: "AAPL",
      company: "Apple",
      Price: "5.0",
      ListOfHistoryPrice:[
        {price: "1.0"},
        {price: "1.2"},
        {price: "1.4"},
        {price: "1.6"},
        {price: "1.8"}
      ]
    },
    {
      symbol: "filteredalso",
      company: "Apple",
      Price: "5.0",
      ListOfHistoryPrice:[
        {price: "1.0"},
        {price: "1.2"},
        {price: "1.4"},
        {price: "1.6"},
        {price: "1.8"}
      ]
    },
    {
      symbol: "filteredaswell",
      company: "Apple",
      Price: "5.0",
      ListOfHistoryPrice:[
        {price: "1.0"},
        {price: "1.2"},
        {price: "1.4"},
        {price: "1.6"},
        {price: "1.8"}
      ]
    }
  ]
  return res.json({message: sampleUpdatedListOfStock});
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
    return res.json({message: sampleUpdatedListOfStock});
  }

})

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
  console.log("backend listening on", PORT)
})
