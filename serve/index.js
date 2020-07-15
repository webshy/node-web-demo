const express = require('express')

const app = express()
app.set('secret','webshy')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)

app.listen(4400,() => {
  console.log('http://localhost:4400')
}) 