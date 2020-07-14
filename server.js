const express = require('express')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./keys/keys.js')
const passport = require('passport')
const cookieSession = require('cookie-session')
const cors = require('cors')
const flash = require('connect-flash')
const schema = require('./schema/schema.js')
const session = require('express-session');
const path = require('path')

const compression = require('compression')
const enforce = require('express-sslify')

mongoose.connect(`mongodb+srv://daylan:${keys.mongoURI}@cluster0-pqujg.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true})
require('./models/Stock.js')
require('./models/User.js')
require('./services/localSignup.js')
require('./services/google.js')

const app = express()


if (process.env.NODE_ENV === 'production') {
  app.use(compression())
  app.use(enforce.HTTPS({
    trustProtoHeader: true
  }))

  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

let origin = process.env.NODE_ENV === 'production' ? 'https://stock-simu.herokuapp.com' : 'http://localhost:3000'

app.use(bodyParser.json())
app.use('*', cors({
  origin,
  credentials: true
}));


app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)


app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: 'secret'
}));

app.use(passport.initialize())
app.use(passport.session())
require('./routes/auth.js')(app)
require('./routes/user.js')(app)


app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}))



// function isAuthenticated(req, res, next) {
//   return req.isAuthenticated() ?
//     next() :
//     res.redirect('/auth/google');
// }



// const graphqlHTTP = require('express-graphql');

// app.use(
//   '/graphql',
//   graphqlHTTP(req => ({
//     schema,
//     graphiql: true,
//     context: req
//   }))
// );

const PORT = process.env.PORT || 5010
app.listen(PORT, () => console.log('Your live on port ' + PORT))





