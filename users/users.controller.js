const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(
            user => {
                if(user){

                    if(req.body.password.length >= 8){
                        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

                        if(strongRegex.test(req.body.password)) {
                            res.json(user)
                        } else if(mediumRegex.test(req.body.password)) {
                            res.status(400).json({ message: "medium password" })
                        } else {
                            res.status(400).json({ message: "poor password" })
                        }
                    }
                    else
                    res.status(400).json({ message: 'password < 8' })
                    
                }
                else{
                    res.status(400).json({ message: 'Username or passwords is incorrect' })
                } 
            }
            )
        .catch(
            err => next(err)
            );
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
