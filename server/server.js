// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.

let userArgs = process.argv.slice(2)

const express = require("express")
const session = require("express-session")

const app = express()
const port = 8000
const cors = require("cors")

const bcrypt = require("bcrypt")
// Use the cors middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);


var answerTable = require('./models/answers.js');
var questionTable = require('./models/questions.js');
var tagTable = require('./models/tags.js');
var userTable = require('./models/user.js');

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/fake_so";
const client = new MongoClient(uri);


// Connect to the MongoDB database
let mongoose = require("mongoose");
const tags = require("./models/tags");
mongoose.connect('mongodb://127.0.0.1:27017/fake_so', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.on("connected", function () {
  console.log("Connected to database");
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


// Run the server on port 8000
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on("SIGINT", () => {
    console.log("Server closed. Database instance disconnected.");
    process.exit(0);
})


//sends an array of questions to client
app.get('/getAllQuestions', async (req, res) => {
  //console.log(await questionTable.find({}))

  try{
    res.send(await questionTable.find({}));
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});


//sends an array of tags to client
app.get('/getAllTags', async (req, res) => {
  //console.log(await questionTable.find({}))
  try{
    res.send(await tagTable.find({}));
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});
//sends an array of questions to client
app.get('/getAllAnswers', async (req, res) => {
  //console.log(await questionTable.find({}))

  try{
    res.send(await answerTable.find({}));
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

// gets Tag object given a tid
app.get('/getTagBytid/:tid', async (req, res) => {
  try{
    let tid = req.params.tid;
    //console.log(tid);
    res.send(await tagTable.find({_id: tid}, "_id name"));
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});



//increment num of view for a question id
app.post('/increaseView/:id', async (req, res) => {
  try{
    let id = req.params.id;
    //console.log("increaseView");
    //console.log(id);

    const query = { _id: id};
    const update = { $inc: { views: 1 } };

    await questionTable.updateOne(
      query,
      update
   );
   res.send(await questionTable.find({_id: id}));
   
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
  });

//add a new answer and return its id
app.post('/answers_add_aid', async(req,res)=>{
  try{
    let ans = req.body;
    let date = new Date();
    //console.log(date);
    //console.log(ans);
    let new_ans = new answerTable({
      text: ans["text"],
      ans_by: ans["ans_by"],
      ans_date_time: date
    });
    await new_ans.save();
    res.json(new_ans["_id"]);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// add answer id to the question
app.post('/question_update_aid', async(req,res)=>{
  try{
    let data=req.body;
    //console.log(data);

    const query = { _id: data["qid"]};
    const update = { $push: { answers: data["aid"]} };

    await questionTable.updateOne(
      query,
      update
   );

   res.send(await questionTable.find({_id: data["qid"]}));

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



//update tags add new tag
app.post('/update_tag', async(req,res)=>{
  try{
    let tag=req.body.tag_name;
    console.log(tag);
    let new_tag=new tagTable({name:tag});
    await new_tag.save();
    res.json(new_tag["_id"]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//update questions add new questsion
app.post('/update_questions',async (req,res)=>{
  try{
    let data=req.body;
    console.log(data["tags"]);
    let questions=questionTable({
      answers:data["answers"],
      ask_date_time:data["ask_date_time"],
      asked_by:data["asked_by"],
      tags:data["tags"],
      text:data["text"],
      title:data["title"],
      views:data["views"],
    });
    await questions.save();
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
});

//register new user
app.post('/registerUser', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await userTable.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const newUser = new userTable({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });
    await newUser.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// handle login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userTable.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Email not registered!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    session.userId = user.id;
    session.username = user.username;
    res.send({ message: "Successfully logged in!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while logging in" });
  }
});



// check log in
app.get('/checkLoggedIn', (req, res) => {
  // Check if user is logged in, e.g. by verifying a session or token
  if (session.username) {
    // If user is logged in, return the username or other user data as JSON
    res.json(session.username);
  } else {
    // If user is not logged in, return an error status code and message
    res.status(401).json({ error: 'User not logged in' });
  }
});

app.get("/logout", async (req, res) => {
  session.userId = null
  session.username = null
  res.send("logged out")
})


