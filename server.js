const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const usernames = {
    1: 'Mike',
    2: 'Morgan',
    3: 'Jerry'
}

app.get('/username/:id', (req, res) => {
    res.send({
        username: usernames[req.params.id]
    })
})

app.listen(3000)