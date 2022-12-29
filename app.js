const express = require('express')
const app = express()
const PORT = 5250;
const path = require('path')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(PORT, () => {
    console.log('App running on PORT 5250')
})