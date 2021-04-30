const express = require('express');
const cors = require('cors');
const mysql = require("mysql");
const app = express();
app.use(cors())

USERNAME = ""

var db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'cwk0aDwlds3vywG6',
    database:'alpha_finance',
    port:3377
})


app.get('/login', (req, res) => {
  console.log("I am about to login", req.query["username"])
  // TODO: please finish this part
  // If the username and password is correct, return with username as message. Else return a empty string in message
  sqlSelect = "select user_id, account_name from user where account_name='" + req.query["username"] + "' and pwd='" + req.query["password"] + "'";
  db.query(sqlSelect, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result)
      return res.json({message: result});
    }
  });

})

app.get('/getvisit', (req, res)=>{
  console.log("getting visit of", req.query["user_id"])
  query = "select distinct symbol from view_history where user_id=" + req.query["user_id"]+ ";";
  db.query(query, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result);
      return res.json({message: result});
    }
  });
})

app.get('/visit', (req, res) => {
  console.log("I am about to visit", req.query["visitedstock"])
  // TODO: please finish this part
  // Return the new recent view list
  if (req.query['user_id'] !== '' ){
    query = "INSERT INTO view_history (user_id, symbol) " + "VALUES (" + req.query['user_id'] + ", '" + req.query['visitedstock'] + "')";
    db.query(query, (err, result) => {
        // response.send(result);
      if (err) throw err;
      else{
        console.log(result);
        return res.json({message: result});
      }
    });
  }else{
    return res.json({message: "sampleNewRecentView"});
  }

})

app.get('/advanced', (req, res) => {
  console.log("advanced", req.query['selectedStock'])
  // TODO: please finish this part
  // Return the new recent view list
  query = "call recommend('" + req.query['selectedStock'] + "');";
  db.query(query, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result);
      return res.json({message: result});
    }
  });
})

app.get('/getfavorite', (req, res)=>{
  console.log("getting visit of", req.query["user_id"])
  query = "select distinct symbol from favorates where user_id=" + req.query["user_id"]+ ";";
  db.query(query, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result);
      return res.json({message: result});
    }
  });
})

app.get('/favorite', (req, res) => {
  console.log("I am about to set favorite", req.query["visitedstock"])
  // TODO: please finish this part
  // Return the new recent view list
  if (req.query['user_id'] !=='' && req.query['visitedstock'] !== undefined){
    query = "INSERT INTO favorates (user_id, symbol) " + "VALUES (" + req.query['user_id'] + ", '" + req.query['visitedstock'] + "')";
    db.query(query, (err, result) => {
        // response.send(result);
      if (err) throw err;
      else{
        console.log(result);
        return res.json({message: result});
      }
    });
  }
  // return res.json({message: sampleNewRecentView});
})

app.get('/getRecommand', (req, res)=>{
  console.log("getting recommand")
  query = "select symbol from RecTable limit 5";
  db.query(query, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result);
      return res.json({message: result});
    }
  });
})

app.get('/history', (req, res)=>{
  console.log("getting history of ", req.query["selectedStock"])
  query = "select Date_PK, Day_High, Day_Low, Open_Price, Close_Price from historical_data where symbol='" + req.query["symbol"] + "'";
  console.log(query)
  db.query(query, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result);
      return res.json({message: result});
    }
  });
})

app.get('/sector', (req, res) => {
  // TODO: give me a list of sectors
  sqlSelect = "select distinct sector from company;";
  db.query(sqlSelect, (err, result) => {
      // response.send(result);
    if (err) throw err;
    else{
      console.log(result)
      return res.json({message: result});
    }
  });
})

app.get('/filter', (req, res) => {
  // TODO: please finish this part
  // Return the filtered recent view list
  // const stockIndustry=["Airlines", "Tech"].toString();
  console.log("filter list: ", req.query["filterList"])
  console.log("searchquery: ", req.query["searchquery"])
  if (req.query["filterList"][0] == ''){
    // If it is initailization, send back a string message
    search = '';
    if (req.query["searchquery"] !== ''){
      search = "where c.company_name like '%" + req.query["searchquery"] + "%'";
    }
    sqlSelect = "SELECT s.symbol, s.market_price, c.company_name FROM stocks s natural join company c " + search + " LIMIT 100";
    // console.log(sqlSelect)
    db.query(sqlSelect, (err, result) => {
        // response.send(result);
      if (err) throw err;
      else{
        console.log(result)
        return res.json({message: result});
      }
    });
  }else{
    sqlSelect = "SELECT s.symbol, s.market_price, c.company_name FROM stocks s natural join company c where";
    search = '';
    limit = " LIMIT 100";
    if (req.query["searchquery"] !== ''){
      search = "c.company_name like '%" + req.query["searchquery"] + "%'";
    }
    if (req.query["filterList"]){
      sqlSelect += " (sector = '"
      if (search !== '')
        search = "') and " + search;
      else
        limit = "')" + limit;
    }
    sqlSelect += req.query["filterList"].join("' or sector = '") + search + limit;
    // console.log(sqlSelect)
    db.query(sqlSelect, (err, result) => {
        // response.send(result);
      if (err) throw err;
      else{
        return res.json({message: result});
      }
    });
  }

})

app.get('/search', (req, res) => {
  console.log("I am about to search", req.query["searchquery"])
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


app.get('/history', (req, res) => {
  console.log("I am about to check history of ", req.query["selectedstock"])
  const stockSymbol = req.query["selectedstock"];
  const sqlSelect = `SELECT * FROM historical_data WHERE symbol=\"${stockSymbol}\"`;
  db.query(sqlSelect, (err, result) => {
      // response.send(result);
    console.log("SQL command: ", sqlSelect)
    if (err) console.log(err);
    return res.json({message: result});
  });

})


app.listen(4000, ()=>{
  console.log("backend listening on 4000")
})
