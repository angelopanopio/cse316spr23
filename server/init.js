//Setup database with initial test data.
// Include an admin user.
// Script should take admin credentials as arguments as described in the requirements doc.

//Ex run: node init.js mongodb://127.0.0.1:27017/fake_so admin password


let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

let Tag = require('./models/tags');
let Answer = require('./models/answers');
let Question = require('./models/questions');
let Comment = require('./models/comments');
let User = require('./models/user');

let mongoose = require('mongoose');
let mongoDB = userArgs[0];
let adminUser = userArgs[1];
let adminPass = userArgs[2];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function userCreate(username, password, email){
    let user = new User(
        {
            username: username,
            password: password,
            email: email
        }
    );

    return user.save();
}

function tagCreate(name, users_using_tag) {
  let tag = new Tag({ name: name,
    users_using_tag : users_using_tag});
  return tag.save();
}

function commentCreate(comment_by, text, votes, comment_date_time) {
    let comment = new Comment({ 
        comment_by : comment_by,
        text : text,
    });

    if (votes != false) comment.votes = votes;
    if (comment_date_time != false) comment.comment_date_time = comment_date_time;
    return comment.save();
  }

function answerCreate(text, ans_by, ans_date_time, comments, votes, author_id) {
  answerdetail = {text:text};
  if (ans_by != false) answerdetail.ans_by = ans_by;
  if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;
  
  if (comments != false) answerdetail.comments = comments;
  if (votes != false) answerdetail.votes = votes;
  if (author_id != false) answerdetail.author_id = author_id;


  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, summary, tags, answers, comments, asked_by, ask_date_time, views, votes, author_id) {
  qstndetail = {
    title: title,
    text: text,
    summary: summary,
    tags: tags,
    asked_by: asked_by,
    author_id : author_id
  };
  if (answers != false) qstndetail.answers = answers;
  if (comments != false) qstndetail.comments = comments;
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (views != false) qstndetail.views = views;
  if (votes != false) qstndetail.votes = votes;
  
  let qstn = new Question(qstndetail);
  return qstn.save();
}

const populate = async () => {
  let u1 = await userCreate(adminUser, adminPass, 'admin@gmail.com');
  let u2 = await userCreate('jaden', 'password123', 'jadenw2542@gmail.com');
  let u3 = await userCreate('burgerpants', 'randomstuff123', 'sally@gmail.com');
  let u4 = await userCreate('tacoking', 'ilovetacos', 'taco@gmail.com');

  let t1 = await tagCreate('react', [u2, ]);
  let t2 = await tagCreate('javascript', [u2, u3 ]);
  let t3 = await tagCreate('android-studio', [u3, u4]);
  let t4 = await tagCreate('shared-preferences', [u3]);

  let c1 = await commentCreate(u2.username, 'testing', 5, false);
  let c2 = await commentCreate(u3.username, 'noice', 1, false);
  let c3 = await commentCreate(u4.username, 'pogchamp', false, false);
  let c4 = await commentCreate(u4.username, 'poggers]', false, false);

  let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
   u2.username, false, false, false, u2);
  let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.',
   u3.username, false, false, 1, u3);
  let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
   u4.username, false, false, 2, u4);
  let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
  u2.username, false, false, 3,u2);
  let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ',
  u3.username, false, false, 4, u3);

  let a6 = await answerCreate('test',
  u3.username, false, false, 5, u3);

  await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.', 
  'animation not working', [t1, t2], [a1, a2], false, u2.username , false, false, 5, u2);
  await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.',
  'app crashing', [t3, t4, t2], [a3, a4, a5], false, u3.username, false, 121, 7, u3);
  await questionCreate('testing1', 'testing1', 'summary', [t3], [a1, a2, a3, a4, a5, a6], [c1, c2, c3, c4], u4.username, false, 5, false, u4);
  await questionCreate('testing2', 'testing2', 'summary', [t3], [a1, a2, a3, a4, a5, a6], [c1, c2, c3, c4], u3.username, false, 5, false, u3);
  await questionCreate('testing3', 'testing3', 'summary', [t3], [a1, a2, a3, a4, a5, a6], [c1, c2, c3, c4], u2.username, false, 5, false, u2);
  await questionCreate('testing4', 'testing4', 'summary', [t3], [a1, a2, a3, a4, a5, a6], [c1, c2, c3, c4], u2.username, false, 5, false, u2);
  await questionCreate('testing5', 'testing5', 'summary', [t3], false, false, u2.username, false, 5, false, u2);
  if(db) db.close();
  console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

console.log('processing ...');