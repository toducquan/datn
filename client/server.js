const express = require('express')
const app = express()
const path = require('path')
app.use(express.static(path.resolve(__dirname, './build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve('./build/index.html'))
})

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const port = Number(process.env.REACT_APP_PORT) || 6868
console.log(`server start listen at: `, port);
app.listen(port);

