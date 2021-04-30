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



function App() {


  const sampleListOfStock = [
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
      symbol: "GGGGG",
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
      symbol: "BBBBB",
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
  const sampleRecommendStock = [
    {
      symbol: "FUCK",
      Price: "5.0"
    },
    {
      symbol: "GGGGG",
      Price: "5.0"
    },
    {
      symbol: "BBBBB",
      Price: "5.0"
    },
    {
    symbol: "GGGGG",
    Price: "5.0"
  },
  {
    symbol: "BBBBB",
    Price: "5.0"
  }
  ]
  const sampleRecentView = ["AAPL"];

  const [shit, setShit] = useState("I am shit");
  const [openRecent, setOpenRecent] = React.useState(false);
  const [recentView, setRecentView] = React.useState(sampleRecentView);
  const [openfavorites, setOpenfavorites] = React.useState(false);
  const [favorites, setfavorites] = React.useState([]);
  const [openIndustry, setOpenIndustry] = React.useState(false);
  const [checkPublishing, setCheckPublishing] = React.useState(false);
  const [checkEntertainment, setCheckEntertainment] = React.useState(false);
  const [selectedStock, setSelectedStock] = React.useState("");
  const [listOfStock, setListOfStock] = React.useState(sampleListOfStock);
  const [recommendStock, setRecommendStock] = React.useState(sampleRecommendStock);
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const [username, setUsername] = React.useState("");

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
        setUsername(resp.message)
    }).catch(err=>console.log(err))
  };

  var handleSearch = () => {
    fetch("http://localhost:4000/search?searchquery="+inputSearch)
    .then(resp => resp.json()).then(resp=>{
        setListOfStock(resp.message)
    }).catch(err=>console.log(err))
  };

  var handleFilter = (callback) => {

    var fitersQuery = ""
    var listOfFilter = [];
    if (checkPublishing) { listOfFilter.push("Publishing") }
    if (checkEntertainment) { listOfFilter.push("Entertainment") }
    if (listOfFilter){
      fitersQuery = "filterList[]="
    }
    fitersQuery += listOfFilter.join("&filterList[]=");

    callback(fitersQuery);

  };

  var handleFilterOut = (inputSearch) => {
    fetch("http://localhost:4000/filter?"+inputSearch)
    .then(resp => resp.json()).then(resp=>{
        setListOfStock(resp.message)
    }).catch(err=>console.log(err))
  }


  var handleVisit = () =>{
    fetch("http://localhost:4000/visit?visitedstock="+selectedStock)
    .then(resp => resp.json()).then(resp=>{
        setRecentView(resp.message);
        setSelectedStock("");
    }).catch(err=>console.log(err))
  }

  var handleFavorite = () =>{
    console.log("Handling favorite")
    if (favorites.indexOf(selectedStock) !== -1){
      setfavorites(favorites.filter(item => item !== selectedStock))
    }else{
      setfavorites(favorites => [...favorites, selectedStock])
    }
  }

  React.useEffect(() => {
    handleFilter(handleFilterOut);
  }, [checkPublishing]);

  return (
      <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      <Dialog onClose={()=>{handleVisit() }} fullWidth maxWidth="500px" aria-labelledby="simple-dialog-title" open={selectedStock}>
        <div  className={classes.dialogPaper}>
         <DialogTitle id="simple-dialog-title">I dont know what jiyu wants here, I just know he is a retard who clicked {selectedStock}.</DialogTitle>
         <Button variant="outlined" color="primary" onClick={handleFavorite} className={classes.likeButton} >
          {favorites.indexOf(selectedStock) !== -1 ? <Icon color="primary">favorite</Icon> : <Icon color="primary">favorite_border</Icon>}
         </Button>
         </div>
       </Dialog>

      <Grid container spacing={3}>

        <Grid item className={classes.griditem} xs={12}/>
        <Grid item className={classes.griditem} xs={1}/>
        <Grid item className={classes.griditem} xs={4}>
        <TextField value={inputSearch} onChange={(e)=>{setInputSearch(e.target.value)}} fullWidth id="search" label="Search" variant="outlined" />
        </Grid>
        <Grid item className={classes.griditem} xs={1}>
        <Button variant="outlined" color="primary" onClick={handleSearch} className={classes.comfirm}>
         <Icon color="primary">done</Icon>
        </Button>
        </Grid>

        <Grid item className={classes.griditem} xs={2}>
        <TextField value={inputUsername} onChange={(e)=>{setInputUsername(e.target.value)}} fullWidth id="username" label="Username" variant="outlined" />
        </Grid>

        <Grid item className={classes.griditem} xs={2}>
        <TextField value={inputPassword} onChange={(e)=>{setInputPassword(e.target.value)}} fullWidth id="password" label="Password" variant="outlined" />
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
              <ListItem button onClick={() => {setOpenIndustry(!openIndustry)}}>
                <ListItemText primary="Industry" />
                {openIndustry ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openIndustry} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkPublishing}
                          onChange={() => {setCheckPublishing(!checkPublishing) }}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                      label="Publishing"
                    />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkEntertainment}
                          onChange={() => {setCheckEntertainment(!checkEntertainment)}}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                      label="Entertainment"
                    />

                  </ListItem>
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
                {item.symbol + "(" + item.company + ")"}
                {"Today's price:" + item.Price}
                {item.ListOfHistoryPrice.map(historyItem => {
                  return (
                    <ListItem>
                      {historyItem.price}
                    </ListItem>
                  )
                })}
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
               <ListItemText primary="favorites" />
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

        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[0].symbol)}}>
        <Paper >
          <div className={classes.bottomblock}>
          {recommendStock[0].symbol}
          {recommendStock[0].Price}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[1].symbol)}}>
        <Paper >
          <div className={classes.bottomblock}>
          {recommendStock[1].symbol}
          {recommendStock[1].Price}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[2].symbol)}}>
        <Paper>
          <div className={classes.bottomblock}>
          {recommendStock[2].symbol}
          {recommendStock[2].Price}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[3].symbol)}}>
        <Paper>
          <div className={classes.bottomblock}>
          {recommendStock[3].symbol}
          {recommendStock[3].Price}
          </div>
        </Paper>
        </Grid>
        <Grid item className={classes.bottomblock} xs={2} button onClick= {()=>{setSelectedStock(recommendStock[4].symbol)}}>
        <Paper>
          <div className={classes.bottomblock}>
          {recommendStock[4].symbol}
          {recommendStock[4].Price}
          </div>
        </Paper>
        </Grid>

        <Grid item className={classes.griditem} xs={1}/>
  </Grid>




    </div>
  );
}

export default App;
