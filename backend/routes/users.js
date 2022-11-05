const router = require('express').Router();
let User = require('../models/user.model');
var jwt = require('jsonwebtoken');
router.route('/').get((req, res) => {
    User.find() //returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:userid').get((req, res) => {
    User.findById(req.params.userid)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post(async (req, res) => {
    // Get body or Data
    console.log(req.body.username);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (!username || !email || !password || !role) {
        return res.status(422).send("Please fill correct details");
    }

    User.findOne({ username:username, email: email }).then((userExist) => {
        if (userExist) {
            return res.status(422).send("User already exists");
        }
    })

    const createUser = new User({
        username: username,
        email: email,
        password: password,
        role: role
    });
    const created = await createUser.save();
    console.log(created);
    return res.status(200).send("Registered");

});

router.route('/login').post(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).send("Please fill the data");
        }
        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);
        if (!userLogin)
            res.status(400).send("User Not Logged in");
        else {
            let _id = userLogin._id;
            var token = jwt.sign({ _id, email }, process.env.SECERET_KEY);
            res.setHeader("Access-Control-Expose-Headers", "*");
            res.setHeader("authorization", token);
            return res.send("User login successfully " + token);

        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;