const connection = require("./database");
const express = require("express");
// const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}`));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // req.header()
  next();
});


// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/testService", function(req, res, next) {
  res.status(200).json({
    message: "allowed"
  });
});

// app.get("/api/modules/:moduleId", (req, res) => {
//   req.params.moduleId
// })

//gets all modules
app.get("/api/modules", (req, res) => {

 // connection.connect();

    connection.query("SELECT * FROM module", function(err, rows, fields) {
      if (err) throw err;

      res.status(200).json(rows);
      console.log("The solution is: ", rows);
    });

  //connection.end();
});

//gets lessons with the selected moduleParentID
app.get("/api/lessons", (req, res) => {

  let moduleParentID = req.query.moduleParentID;
  console.log("to moduleParentID pou peira -> ",moduleParentID);
  
    connection.query("SELECT * FROM lessons WHERE moduleParentID = '"+ moduleParentID +"' " , function(err, rows, fields) {
      if (err) throw err;

      res.status(200).json(rows);
      console.log("The solution is: ", rows);
    }); 

});

//gets chapters with the selected lessonParentId
app.get("/api/chapters", (req, res) => {

  let lessonParentId = req.query.lessonParentId;
  console.log("to lessonParentId pou peira -> ",lessonParentId);
  
    connection.query("SELECT * FROM chapter WHERE lessonParentID = '"+ lessonParentId +"' " , function(err, rows, fields) {
      if (err) throw err;

      res.status(200).json(rows);
      console.log("The solution is: ", rows);
    }); 
});

//gets sections with the selected chapterParentId
app.get("/api/sections", (req, res) => {

  let chapterParentId = req.query.chapterParentId;
  console.log("to chapterParentId pou peira -> ",chapterParentId);
  
    connection.query("SELECT * FROM section WHERE chapterParentId = '"+ chapterParentId +"' " , function(err, rows, fields) {
      if (err) throw err;

      res.status(200).json(rows);
      console.log("The solution is: ", rows);
    }); 
});

//gets user with id
app.get("/api/users/:temp", (req, res) => {

  let id = req.params.temp;
  console.log("GET o user pou peira -> ",id );
 
    connection.query("SELECT * FROM users WHERE id = '"+ id +"' " , function(err, rows, fields) {
      if (err) throw err;

      res.status(200).json(rows);
      console.log("The solution is: ", rows);
    }); 
});

// changes user lvl 
app.put("/api/users/:temp", (req, res) => {

  let id = req.params.temp;
  console.log("PUT o user pou peira -> ",id );
  console.log(req.body);

  connection.query("UPDATE users SET moduleLVL= '"+ req.body.moduleLVL +"',lessonLVL='"+ req.body.lessonLVL +"',chapterLVL='"+ req.body.chapterLVL +"',sectionLVL='"+ req.body.sectionLVL +"' WHERE id='"+ id +"' " , function(err, rows, fields) {
    if (err) throw err;
  }); 

  res.status(200).json({message:"done"});
});

//insert a user
app.post("/api/users/:temp", (req, res) => {

  let id = req.params.temp;
  console.log("POST o user pou bazw -> ",id );
  console.log(req.body);

  connection.query("INSERT INTO users VALUES  ('"+req.body.id+"','"+req.body.email+"','"+req.body.name+"','"+req.body.surname+"','"+req.body.status+"','"+req.body.type+"','"+req.body.registration_date+"','"+req.body.moduleLVL+"','"+req.body.lessonLVL+"','"+req.body.chapterLVL+"','"+req.body.sectionLVL+"')" , function(err, rows, fields) {
    if (err) throw err;
  }); 

  res.status(200).json({message:"inserted"});
});

//get multiple choise questions answers
app.post("/api/multiplechoise",(req, res) => {

  console.log("server");
  console.log(req.body);

  connection.query("SELECT * FROM multiplechoise WHERE moduleid= '"+ req.body.moduleid +"'AND lessonid='"+ req.body.lessonid +"'AND chapterid='"+ req.body.chapterid +"'AND sectionid='"+ req.body.sectionid +"' " , function(err, rows, fields) {
    if (err) throw err;

    res.status(200).json(rows);
    console.log("The solution is: ", rows);
  }); 

});

//get  code quesations
app.post("/api/codeq",(req, res) => {

    console.log("server");
    console.log(req.body);
    
    connection.query("SELECT cquestion FROM codequestion WHERE moduleid= '"+ req.body.moduleid +"'AND lessonid='"+ req.body.lessonid +"'AND chapterid='"+ req.body.chapterid +"'AND sectionid='"+ req.body.sectionid +"' " , function(err, rows, fields) {
      if (err) throw err;
        if(!rows.length){
          res.status(200).json({cquestion:"No code question Found !"});
        }else{
          res.status(200).json({cquestion:rows[0].cquestion});
        }
 
    }); 

  });
//get challenge module multiple choise questions answers
app.post("/api/challenge/module/mc",(req, res) => {
  console.log("server challenge module-->",req.body.moduleid);
  connection.query("SELECT * FROM challengemc WHERE moduleLVL= '"+ req.body.moduleid +"'" , function(err, rows, fields) {
    if (err) throw err;

    res.status(200).json(rows);
    console.log("The solution is: ", rows);
  }); 

 
});
//get challenge module  code quesations
app.post("/api/challenge/module/cq",(req, res) => {
  console.log("server challenge module//",req.body.moduleid);
  connection.query("SELECT * FROM challengecq WHERE moduleLVL= '"+ req.body.moduleid +"'" , function(err, rows, fields) {
    if (err) throw err;

    res.status(200).json(rows);
    console.log("The solution is: ", rows);
  }); 
 
});
//get challenge  once multiple choise questions answers
 app.get("/api/challenge/once/mc",(req, res) => {

  console.log("server");
  connection.query("SELECT * FROM challengemconce " , function(err, rows, fields) {
    if (err) throw err;

    res.status(200).json(rows);
    console.log("The solution is: ", rows);
  }); 

});

//get challenge once  code quesations
app.get("/api/challenge/once/cq",(req, res) => {

  console.log("server");
  connection.query("SELECT * FROM challengecqonce " , function(err, rows, fields) {
    if (err) throw err;

    res.status(200).json(rows);
    console.log("The solution is: ", rows);
  }); 

});
