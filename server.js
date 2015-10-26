import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

// API
var router = express.Router();  

var availableUsers = [
  { id: 1, username: 'foo', password: 'bar' },
  { id: 2, username: 'test@example.com', password: 'testing' },
  { id: 3, username: 'moo', password: 'cow' }
];

var loggedInUsers = [];
var messageList = [];

router.post('/login', function(req, res) {
  var user = availableUsers.find((user) => user.username === req.body.username && user.password === req.body.password);

  if (!user) {
    res.status(400).json({error: 'Username/password invalid'});
  } else {
    const { password, ...userData } = user;
    if (loggedInUsers.indexOf(user.id) === -1) {
      loggedInUsers.push(user.id);
    }
    res.json(userData);
  }
});

router.post('/logout', function(req, res) {
  var index = loggedInUsers.indexOf(req.body.userId);

  if (index === -1) {
    res.status(404).json({error: 'User not found'});
  } else {
    loggedInUsers.splice(index, 1);
    res.json({ success: true });
  }
});

router.post('/message', function(req, res) {
  var user = availableUsers.find((user) => user.id === req.body.userId);

  if (!user || !req.body.message) {
    res.status(400).json({error: 'Unable to process message'});
  } else {
    const message = { id: messageList.length + 1, userId: user.id, message: req.body.message, createdAt: Date.now() };
    messageList.push(message);
    res.json({ success: true, message: message });
  }
});

router.get('/users', function(req, res) {
  const users = loggedInUsers.map((id) => {
    var user = availableUsers.find((user) => user.id === id);
    if (user) {
      const { password, ...userData } = user;
      return userData; 
    }
  });
  res.json({ users: users });
});

router.get('/messages', function(req, res) {
  res.json({ messages: messageList });
});

app.use('/api', router);

// Catch all
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
