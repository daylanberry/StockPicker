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

mongoose.connect(`mongodb+srv://daylan:${keys.mongoURI}@cluster0-pqujg.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true})
require('./models/User.js')
require('./services/localSignup.js')
require('./services/google.js')

const app = express()

app.use(bodyParser.json())
app.use('*', cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)


app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'verysecretsecret'
}));

app.use(passport.initialize())
app.use(passport.session())
require('./routes/auth.js')(app)
require('./routes/user.js')(app)


app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}))

const PORT = process.env.PORT || 5010
app.listen(PORT, () => console.log('Your live on port ' + PORT))