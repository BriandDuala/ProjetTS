const express = require('express');

const app = express();

module.exports = app;

app.use(express.json())
app.post('/users', async (req, res) => {
  const { password, username } = req.body

  if (!password || !username) {
    res.status(400).json({ message: 'Username or passwords is incorrect' })
    return
  }

  if(password.length >= 8){
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if(strongRegex.test(password)) {
            res.end(JSON.stringify({"password": password, "username": username}));
        } else if(mediumRegex.test(password)) {
            res.status(400).json({ message: "Medium password" })
            return
        } else {
            res.status(400).json({ message: "Poor password" })
            return
        }
    }
    else
    {
        res.status(400).json({ message: 'Password too short expect to be >= 8 char' })
        return
    }
})
