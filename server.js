const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('datemy', () => {
  return new Date().getDate()
})
hbs.registerHelper('upper', text => {
  return text.toUpperCase()
})

app.use((req, res, next) => {
  console.log(req.method)
  const root = `the method is ${req.method} and the url is ${req.url}\n`

  fs.appendFileSync('ali.log', root)
  next()
})
app.use((req, res, next) => {
  res.render('update.hbs')
})
app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.render('ali.hbs', {
    name: 'Ali',
    class: 'bscs'
  })
})

app.get('/sohaib', (req, res) => {
  res.render('sohaib.hbs', {
    name: 'sohaib',
    class: 'bsse',
    age: 22,
    degree: 'se'
  })
})

app.listen(3000, () => {
  console.log('server is about to start')
})
