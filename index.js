'use strict'

const express = require('express')  
const app = express()  
const port = 3000
const cors = require('cors')

app.use(cors())

app.set('view engine')
app.set('views', __dirname + '/views')


const pg = require('pg')  
const conString = 'postgres://user:password@host/database' // make sure to match your own database's credentials

pg.connect(conString, function (err, client, done) {  
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT * from table limit 10;', function (err, result) {
    done()

    if (err) {
      return console.error('error happened during query', err)
    }
    console.log(result.rows)
  })
})

app.get('/overall', function (req, res, next) {  
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT * from table limit 10;', [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.json(result.rows)
    })
  })
})

// Server
app.listen(3000, function(){
    console.log('Server Started On Port 3000')
})
exports = module.exports = app 						// expose app