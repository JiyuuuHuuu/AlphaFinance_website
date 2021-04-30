import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';
import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'


function App() {






  const [openRecent, setOpenRecent] = React.useState(false);
  const [recentView, setRecentView] = React.useState([]);
  const [openfavorites, setOpenfavorites] = React.useState(false);
  const [favorites, setfavorites] = React.useState([]);
  const [openSector, setOpenSector] = React.useState(false);
  const [sector, setSector] = React.useState([]);
  const [sectorCheckList, setSectorCheckList] = React.useState([]);

  const [selectedStock, setSelectedStock] = React.useState("");
  const [listOfStock, setListOfStock] = React.useState([]);
  const [listOfHistory, setListOfHistory] = React.useState([]);
  const [listOfIndustry, setListOfIndustry] = React.useState([]);
  const [recommendStock, setRecommendStock] = React.useState([]);
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [userid, setUserid] = React.useState("");
  const [historyData, setHistoryData] = React.useState([])

  const useStyles = makeStyles((theme) => ({

    paper: {
      padding: theme.spacing(5),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    root: {
      height: 500
    },
    gridroot: {
      flexGrow: 1,
      marginLeft: '50rem'
    },
    griditem:{
      margin: 0
    },
    paperColumn: {
      height: 540
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    bottomblock: {
      height: 100
    },
    allowScrow: {
      overflowY: "scroll"
    },
    comfirm: {
      height: 55
    },
    likeButton: {
      top: -50,
      left: "90%",
    },
    dialogPaper: {
      height: 300
    }
  }));
  const classes = useStyles();

  var handleLogin = () => {
    fetch("http://localhost:4000/login?username="+inputUsername+"&password="+inputPassword)
    .then(resp => resp.json()).then(resp=>{
        setUsername(resp.message[0]["account_name"])
        setUserid(resp.message[0]["user_id"])
    }).catch(err=>console.log(err))
  };



  var handleFilter = (callback) => {

    var fitersQuery = ""
    if (sectorCheckList){
      fitersQuery = "filterList[]="
    }
    fitersQuery += sectorCheckList.join("&filterList[]=");
    callback(fitersQuery);

  };

  var handleFilterOut = (input) => {
    fetch("http://localhost:4000/filter?"+input+"&searchquery="+inputSearch)
    .then(resp => resp.json()).then(resp=>{
        setListOfStock(resp.message)
    }).catch(err=>console.log(err))
  };


  var handleVisit = () =>{
    console.log("selectedStock: " + selectedStock)
    fetch("http://localhost:4000/visit?visitedstock="+selectedStock+"&user_id="+userid)
    .then(resp => resp.json()).then(resp=>{
      if (userid){
        setRecentView(recentView => [...recentView, selectedStock])
      }
        setSelectedStock("");
    }).catch(err=>console.log(err))
  };

  var getVisit = () =>{

    fetch("http://localhost:4000/getvisit?&user_id="+userid)
    .then(resp => resp.json()).then(resp=>{

        var views = [];
        for (const element of resp.message){
          views.push(element.symbol)
        }
        console.log(views)
        setRecentView(views);
    }).catch(err=>console.log(err))
  };


  var handleFavorite = () =>{
    console.log("Handling favorite")
    console.log("selectedStock: " + selectedStock)
    fetch("http://localhost:4000/favorite?visitedstock="+selectedStock+"&user_id="+userid)
    .then(resp => resp.json()).then(resp=>{
      if (favorites.indexOf(selectedStock) !== -1){
        setfavorites(favorites.filter(item => item !== selectedStock))
      }else{
        setfavorites(favorites => [...favorites, selectedStock])
      }
      advanced();
    }).catch(err=>console.log(err))
  };

  var advanced = () =>{
    console.log("advanced")
    fetch("http://localhost:4000/advanced?selectedStock="+selectedStock)
    .then(resp => resp.json()).then(resp=>{
      handleGetRecommand()
    }).catch(err=>console.log(err))
  };

  var getFavorite = () =>{
    fetch("http://localhost:4000/getfavorite?&user_id="+userid)
    .then(resp => resp.json()).then(resp=>{
        console.log("getting favorite")
        var views = [];
        for (const element of resp.message){
          views.push(element.symbol)
        }
        console.log(views)
        setfavorites(views);
    }).catch(err=>console.log(err))
  }

  var handleGetRecommand = () => {
    fetch("http://localhost:4000/getRecommand")
    .then(resp => resp.json()).then(resp=>{
      console.log("getting Recommand")
        var views = [];
        for (const element of resp.message){
          views.push(element.symbol)
        }
        console.log("recommand:", views)
        setRecommendStock(views);
    }).catch(err=>console.log(err))
  }


  var handleSector = () => {
    console.log("HandleSector")
    fetch("http://localhost:4000/sector")
    .then(resp => resp.json()).then(resp=>{
      setSector(resp.message)
    }).catch(err=>console.log(err))
  }

  var handleSectorCheckList = (item) => {
    if (sectorCheckList.indexOf(item) !== -1){
      setSectorCheckList(sectorCheckList.filter(stuff => stuff !== item))
    }else{
      setSectorCheckList(sectorCheckList => [...sectorCheckList, item])
    }
  }

  var handleEnter =()=>{
    fetch("http://localhost:4000/history?&symbol="+selectedStock)
    .then(resp => resp.json()).then(resp=>{
        setHistoryData(resp.message)
    }).catch(err=>console.log(err))
  }

  React.useEffect(() => {
    handleFilter(handleFilterOut);
  }, [sectorCheckList]);

  React.useEffect(() => {
    handleSector();
  }, []);

  React.useEffect(() => {
    if (userid){
      getVisit();
    }
  }, [userid]);

  React.useEffect(() => {
    if (userid){
      getFavorite();
    }
  }, [userid]);

  React.useEffect(() => {
    if (userid){
      handleGetRecommand();
    }
  }, [userid]);

  // React.useEffect(() => {
  //   if (userid){
  //     handleGetRecommand();
  //   }
  // }, [favorites]);




  return (
      <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      <Dialog onEnter={handleEnter} onClose={handleVisit} fullWidth maxWidth="500px" aria-labelledby="simple-dialog-title" open={selectedStock}>
        <div  className={classes.dialogPaper}>
         <DialogTitle id="simple-dialog-title">{selectedStock} </DialogTitle>
         <Button variant="outlined" color="primary" onClick={handleFavorite} className={classes.likeButton} >
          {favorites.indexOf(selectedStock) !== -1 ? <Icon color="primary">favorite</Icon> : <Icon color="primary">favorite_border</Icon>}
         </Button>
         <div  className={classes.allowScrow}>
         <ListItem>
         <Grid container spacing={1}>

           <Grid item className={classes.griditem} xs={1}/>
           <Grid item className={classes.griditem} xs={2}>
             Date
           </Grid>
           <Grid item className={classes.griditem} xs={2}>
             Open Price
           </Grid>
           <Grid item className={classes.griditem} xs={2}>
             Close Price
           </Grid>
           <Grid item className={classes.griditem} xs={2}>
             Day High
           </Grid>
           <Grid item className={classes.griditem} xs={3}>
             Day Low
           </Grid>
         </Grid>
         </ListItem>
         {historyData.map(item => {
           return (
             <ListItem>
             <Grid container spacing={1}>

               <Grid item className={classes.griditem} xs={1}/>
               <Grid item className={classes.griditem} xs={2}>
                 {item.Date_PK}
               </Grid>
               <Grid item className={classes.griditem} xs={2}>
                 {item.Open_Price}
               </Grid>
               <Grid item className={classes.griditem} xs={2}>
                 {item.Close_Price}
               </Grid>
               <Grid item className={classes.griditem} xs={2}>
                 {item.Day_High}
               </Grid>
               <Grid item className={classes.griditem} xs={3}>
                 {item.Day_Low}
               </Grid>
             </Grid>
             </ListItem>
           )
         })}
         </div>
         </div>
       </Dialog>

      <Grid container spacing={3}>

        <Grid item className={classes.griditem} xs={12}/>
        <Grid item className={classes.griditem} xs={1}/>
        <Grid item className={classes.griditem} xs={4}>
        <TextField value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} fullWidth id="search" label="Search" variant="outlined" />
        </Grid>
        <Grid item className={classes.griditem} xs={1}>
        <Button variant="outlined" color="primary" onClick={()=>{handleFilter(handleFilterOut)}} className={classes.comfirm}>
         <Icon color="primary">done</Icon>
        </Button>
        </Grid>

        <Grid item className={classes.griditem} xs={2}>
        <TextField value={inputUsername} onChange={(e)=>{setInputUsername(e.target.value)}} fullWidth id="username" label="Username" variant="outlined" />
        </Grid>

        <Grid item className={classes.griditem} xs={2}>
        <TextField type="password" value={inputPassword} onChange={(e)=>{setInputPassword(e.target.value)}} fullWidth id="password" label="Password" variant="outlined" />
        </Grid>
        <Grid item className={classes.griditem} xs={1}>
          <Button variant="outlined" color="primary" onClick={handleLogin} className={classes.comfirm}>
           <Icon color="primary">login</Icon>
          </Button>
        </Grid>
        <Grid item className={classes.griditem} xs={1}/>

        <Grid item className={classes.griditem} xs={1}/>
        <Grid item className={classes.paperColumn} xs={2}>
        <Paper >
          <div className={classes.allowScrow}>
           <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              className={classes.root}
            >
              <ListItem button onClick={() => {setOpenSector(!openSector)}}>
                <ListItemText primary="Industry" />
                {openSector ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openSector} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {sector.map(item =>{
                    return(
                      <ListItem button className={classes.nested}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={sectorCheckList.indexOf(item.sector) !== -1}
                              onChange={() => { handleSectorCheckList(item.sector) }}
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                          }
                          label={item.sector}
                        />
                      </ListItem>
                    )
                  })}


                </List>
              </Collapse>
            </List>
          </div>
        </Paper>
        </Grid>

        <Grid item className={classes.paperColumn} xs={6}>
        <Paper >
          <div className={classes.allowScrow}>
          <List className={classes.root}>
          {listOfStock.map(item => {
            return (
              <ListItem button onClick={()=>{setSelectedStock(item.symbol)}}>
              <Grid container spacing={1}>

                <Grid item className={classes.griditem} xs={1}/>
                <Grid item className={classes.griditem} xs={2}>
                  {item.symbol}
                </Grid>
                <Grid item className={classes.griditem} xs={7}>
                  {"("+item.company_name+")"}
                </Grid>
                <Grid item className={classes.griditem} xs={2}>
                  {item.market_price}
                </Grid>
              </Grid>
              </ListItem>
            )
          })}
          </List>
          </div>
        </Paper>
        </Grid>

        <Grid item className={classes.paperColumn} xs={2}>
        <Paper >
          <div className={classes.allowScrow}>
          <List
             component="nav"
             aria-labelledby="nested-list-subheader"
             className={classes.root}
           >
             <ListItem button onClick={() => {setOpenRecent(!openRecent)}}>
               <ListItemText primary="Recent View" />
               {openRecent ? <ExpandLess /> : <ExpandMore />}
             </ListItem>
             <Collapse in={openRecent} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>
                 {recentView.map(item => {
                   return (
                     <ListItem button onClick={()=>{setSelectedStock(item)}} className={classes.nested}>
                       <ListItemText primary={item} />
                     </ListItem>
                   )
                 })}
               </List>
             </Collapse>
             <ListItem button onClick={() => {setOpenfavorites(!openfavorites)}}>
               <ListItemText primary="Favorites" />
               {openfavorites ? <ExpandLess /> : <ExpandMore />}
             </ListItem>
             <Collapse in={openfavorites} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>
                 {favorites.map(item => {
                   return (
                     <ListItem button onClick={()=>{setSelectedStock(item)}} className={classes.nested}>
                       <ListItemText primary={item} />
                     </ListItem>
                   )
                 })}
               </List>
             </Collapse>
           </List>
           </div>
        </Paper>

        </Grid>
        <Grid item className={classes.griditem} xs={1}/>



        <Grid item className={classes.griditem} xs={1}/>

        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[0])}}>
        <Paper >
          <div className={classes.bottomblock}>
          {recommendStock[0]}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[1])}}>
        <Paper >
          <div className={classes.bottomblock}>
          {recommendStock[1]}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[2])}}>
        <Paper>
          <div className={classes.bottomblock}>
          {recommendStock[2]}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[3])}}>
        <Paper>
          <div className={classes.bottomblock}>
          {recommendStock[3]}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[4])}}>
        <Paper>
          <div className={classes.bottomblock}>
          {recommendStock[4]}
          </div>
        </Paper>
        </Grid>

        <Grid item className={classes.griditem} xs={1}/>
  </Grid>




    </div>
  );
}

export default App;
